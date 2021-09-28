IDOL_NAMES = ['arisu','koharu','yoshino','yukimi','yumi'];
COSTUME_DICT = {
	"SSB": "Starry Sky Blue",
	"CD": "Cinderella Dream"
}
	
	//function for automatically changing idol names so no duplicates occur 
function selectControl(number) {
	if (document.getElementById("solomode").checked) {
		loadSoloSongs();
	}
	var changed_idols = document.getElementById("idol" + number);
	var idol = changed_idols.options[changed_idols.selectedIndex].value;

	for (i=1;i<6;i++){
		if('' + i != number){
			var other_idols = document.getElementById("idol" + i);
			var other_idol = other_idols.options[other_idols.selectedIndex].value
			if (other_idol==idol) {
				var wrong_index = i;
				break;
			}
		}
	}
	var idol1s = document.getElementById("idol1");
	var idol1 = idol1s.options[idol1s.selectedIndex].value.toLowerCase();

	var idol2s = document.getElementById("idol2");
	var idol2 = idol2s.options[idol2s.selectedIndex].value.toLowerCase();

	var idol3s = document.getElementById("idol3");
	var idol3 = idol3s.options[idol3s.selectedIndex].value.toLowerCase();

	var idol4s = document.getElementById("idol4");
	var idol4 = idol4s.options[idol4s.selectedIndex].value.toLowerCase();

	var idol5s = document.getElementById("idol5");
	var idol5 = idol5s.options[idol5s.selectedIndex].value.toLowerCase();

	
	var existing_idols = idol1 + idol2 + idol3 + idol4 + idol5;
	var all_idols = ['arisu','koharu','yoshino','yukimi','yumi']
	all_idols.forEach(function (item, index){
		if (existing_idols.includes(item) == false) {
			$('#idol' + wrong_index).val(item[0].toUpperCase() + item.slice(1)).change();
		}
	})
	imageControl()
}

function imageControl() {
	var idol1s = document.getElementById("idol1");
	var idol1 = idol1s.options[idol1s.selectedIndex].value.toLowerCase();

	var idol2s = document.getElementById("idol2");
	var idol2 = idol2s.options[idol2s.selectedIndex].value.toLowerCase();

	var idol3s = document.getElementById("idol3");
	var idol3 = idol3s.options[idol3s.selectedIndex].value.toLowerCase();

	var idol4s = document.getElementById("idol4");
	var idol4 = idol4s.options[idol4s.selectedIndex].value.toLowerCase();

	var idol5s = document.getElementById("idol5");
	var idol5 = idol5s.options[idol5s.selectedIndex].value.toLowerCase();

	document.getElementById("img1").src="./images/" + idol1 + ".png";
	document.getElementById("img2").src="./images/" + idol2 + ".png";
	document.getElementById("img3").src="./images/" + idol3 + ".png";
	document.getElementById("img4").src="./images/" + idol4 + ".png";
	document.getElementById("img5").src="./images/" + idol5 + ".png";
}


function setYoutubeVideo() {
	//from https://stackoverflow.com/questions/23762822/javascript-loading-csv-file-into-an-array
	$.ajax({
			url: "https://raw.githubusercontent.com/nathankchow/nathankchow.github.io/master/video_catalog.csv",
			async: false,
			success: function (csvd) {
			data = $.csv.toArrays(csvd);
			},
			dataType: "text",

		});
	
	if (document.getElementById("solomode").checked) {
		var songs = document.getElementById("song");
		var target_id = songs.options[songs.selectedIndex].value;
		document.getElementById("embed-video").src = "https://www.youtube.com/embed/" + target_id;
		return
	}

	var songs = document.getElementById("song");
	var song = songs.options[songs.selectedIndex].value;

	var idol1s = document.getElementById("idol1");
	var idol1 = idol1s.options[idol1s.selectedIndex].value.toLowerCase();

	var idol2s = document.getElementById("idol2");
	var idol2 = idol2s.options[idol2s.selectedIndex].value.toLowerCase();	

	var idol3s = document.getElementById("idol3");
	var idol3 = idol3s.options[idol3s.selectedIndex].value.toLowerCase();

	var idol4s = document.getElementById("idol4");
	var idol4 = idol4s.options[idol4s.selectedIndex].value.toLowerCase();

	var idol5s = document.getElementById("idol5");
	var idol5 = idol5s.options[idol5s.selectedIndex].value.toLowerCase();

	var youtube_title = "デレステ " + song + " " + idol1 + " " + idol2 + " " + idol3 + " " + idol4 + " " + idol5;
	for (i=0;i<data.length;i++) {
		
		if (youtube_title == data[i][0]) {
			var youtubeId = data[i][1];
			break;
		}
		else {
			var youtubeId = 'zvXS4TFhKvU'
		}
		
	}
	
	//band-aid fix for 3-idol songs for convenience, will rewrite for efficiency if necessary 
	if (youtubeId == 'zvXS4TFhKvU') {
		var youtube_title = "デレステ " + song + " " + idol2 + " " + idol3 + " " + idol4; 
		for (i=0;i<data.length;i++) {
		
			if (youtube_title == data[i][0]) {
				var youtubeId = data[i][1];
				break;
			}
			else {
			var youtubeId = 'zvXS4TFhKvU';
			}
		}
	}

	if (youtubeId == 'zvXS4TFhKvU') {
		var youtube_title = "デレステ " + song + " " + idol2 + " " + idol3; //and for 2-idol songs  
		for (i=0;i<data.length;i++) {
		
			if (youtube_title == data[i][0]) {
				var youtubeId = data[i][1];
				break;
			}
			else {
			var youtubeId = 'zvXS4TFhKvU'
			}
		}
	}
	var youtubeLink = "https://www.youtube.com/embed/" + youtubeId;
	document.getElementById("embed-video").src = youtubeLink;			
}

function importSonglist() {
	//import csv data 
	$.ajax({
		url: "https://raw.githubusercontent.com/nathankchow/nathankchow.github.io/master/video_catalog.csv",
		async: false,
		success: function (csvd) {
		data = $.csv.toArrays(csvd);
		},
		dataType: "text",
	});


	//initialize an array containing all idol names
	var idol_names = ['arisu','koharu','yoshino','yukimi','yumi'];

	//process the csv data for song names
	var song_names = []; 
	for (i=1;i<data.length;i++) { //skip labels, reminder to change iteration endpoint from 5
		var song_name = data[i][0];
		song_name_list = song_name.split(" ");
		for (j=2;j<song_name_list.length;j++) { //skip first item in list ("デレステ")
			var is_idol_name = false
			for (k=0;k<idol_names.length;k++){
				if (song_name_list[j] == idol_names[k]) {
					is_idol_name = true
				}
			}
			if (is_idol_name == true) {
				var end_index = j;
				break
			}
		}
		song_name_list = song_name_list.slice(1,end_index);
		var actual_song_name = song_name_list.join(" ");

		if (song_names.includes(actual_song_name) == false) { //make sure to append each unique song once only
			song_names.push(actual_song_name);
			var o = new Option(actual_song_name, actual_song_name);
			$(o).html(actual_song_name);
			$("#song").append(o);
		}
	}
	actual_song_name = 'Default (14平米にスーベニア by Koharu)';
	var o = new Option(actual_song_name, actual_song_name);
	$(o).html(actual_song_name);
	$("#song").append(o);
	if (document.getElementById("song")[0].value == "null"){
		document.getElementById("song").remove(document.getElementById("song")[0]);
	}
	grayOut()
}

function emptySonglist() {
	$("#song").empty()
}

function loadGroupSongs(){
	emptySonglist();
	importSonglist();
}

function loadSoloSongs(){
	emptySonglist();	
	importSoloSongs();

}

function importSoloSongs() {
	
	$.ajax({
		url: 'https://raw.githubusercontent.com/nathankchow/nathankchow.github.io/master/solo_catalog.csv',
		async: false,
		success: function (csvd) {
		data = $.csv.toArrays(csvd);
		},
		dataType: "text",
	});
	

	solo_song_names = [[],[],[],[],[]];
	var j;
	var idolname;
	var costume;
	var title;
	var id;
	var separated;
	var idol;
	for (i=1;i<data.length;i++) { //skip first entry in csv (labels)
		separated = data[i][0];
		id = data[i][1];

		separated = separated.split(' ');
		idol = separated[separated.length - 1];

		separated = separated.slice(1,separated.length-1); //omit first word (deresute) and idolname 
		
		for (j=0;j<idol.length;j++) {
			if (idol[j] == idol[j].toUpperCase()) {
				idolname = idol.slice(0,j);
				costume = idol.slice(j,idol.length);
				break
			}
		}
	
		if (COSTUME_DICT.hasOwnProperty(costume)) {
			separated.push("(" + COSTUME_DICT[costume] + ")");
		}
		else if (!(isNaN(costume))) { //returns true if costume is a number, or a number string 
			separated.push("(SSR" + costume + ")");
			}

		else {
			separated.push("(Undefined)");
		}


		title = separated.join(' ');
		solo_song_names[IDOL_NAMES.indexOf(idolname)].push([title,id]);
	}
	var idol3s = document.getElementById("idol3");
	var idol3 = idol3s.options[idol3s.selectedIndex].value.toLowerCase();
	var temp_index = IDOL_NAMES.indexOf(idol3);
	for (i=0;i<solo_song_names[temp_index].length;i++) {
		var o = new Option(solo_song_names[temp_index][i][0], solo_song_names[temp_index][i][1]);
		$(o).html(solo_song_names[temp_index][i][0]);
		$("#song").append(o);
	}

	grayOut();
	}
	


function grayOut(){
	if (document.getElementById("solomode").checked) { //exception for when solo mode is selected 
		let greys = [1,2,4,5];
		for (i=1;i<=greys.length;i++) {
			greyIndividual(greys[i],true);
		greyIndividual(3,false);
		}



	}
	else {
	//get song name
	var songs = document.getElementById("song");
	var target_song_name = songs.options[songs.selectedIndex].value;
	//identify number of singers in song
	$.ajax({
		url: "https://raw.githubusercontent.com/nathankchow/nathankchow.github.io/master/video_catalog.csv",
		async: false,
		success: function (csvd) {
		data = $.csv.toArrays(csvd);
		},
		dataType: "text",
	});
	var name_counter = 0;
	var idol_names = ['arisu','koharu','yoshino','yukimi','yumi'];
	for (i=1;i<data.length;i++) { 
		if (data[i][0].includes(target_song_name) == true) {
			for (j=0;j<idol_names.length;j++){
				if (data[i][0].includes(idol_names[j])){
					name_counter = name_counter + 1;
				}
			}
			break
		}
	}
	order = [3,2,4,1,5];
	for (i=0;i<name_counter;i++){
		greyIndividual(order[i],false);
	}
	for (i=name_counter; i<5;i++){
		greyIndividual(order[i],true)
	}
}
	changeOriginalSingers();

}

function greyIndividual(number,bool) {
	if (bool == true) {
		$("#idol" + number).attr("disabled", true);
		$("#img" + number).css("filter", "grayscale(100%)");
	}
	else{
		$("#idol" + number).attr("disabled", false);
		$("#img" + number).css("filter", "grayscale(0%)");
	}
}

function changeOriginalSingers() {

	$.ajax({
		url: "https://raw.githubusercontent.com/nathankchow/nathankchow.github.io/master/originalIdols.json",
		async: false,
		success: function (data2) {
		originalSingers = data2;
		},
		dataType: "json",
	});

	$.ajax({
		url: "https://raw.githubusercontent.com/nathankchow/nathankchow.github.io/master/idolAtt.json",
		async: false,
		success: function (data3) {
		attributes = data3;
		},
		dataType: "json",
	});

	var songs = document.getElementById("song");
	var target_song_name = songs.options[songs.selectedIndex].value;
	if (document.getElementById("solomode").checked) {
		var target_song_name = songs.options[song.selectedIndex].label.split(' (')[0]; //for solo mode songs 
	}

	if (originalSingers.hasOwnProperty(target_song_name) == false) {
	var	target_song_name = "夕映えプレゼント" //dummy name to trigger no names
	}

	for (i=0;i<originalSingers[target_song_name].length;i++) {
		$('#originalDiv' + (i+1)).text(originalSingers[target_song_name][i])
		if (attributes.hasOwnProperty(originalSingers[target_song_name][i])) {
			switch(attributes[originalSingers[target_song_name][i]]) {
				case 'cute':
					$("#originalDiv" + (i+1)).css("background-color","#fc94af");
					break;
				case 'cool':
					$("#originalDiv" + (i+1)).css("background-color","#94cafc");
					break;
				case 'passion':
					$("#originalDiv" + (i+1)).css("background-color","#fcee94");
					break;
			}
			
		}
		else {
			$("#originalDiv" + (i+1)).css("background-color","rgb(169,169,169)")
		}
	}
	

}

