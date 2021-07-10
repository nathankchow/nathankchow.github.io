		//function for automatically changing idol names so no duplicates occur 
		function selectControl(number) {
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
			console.log(youtube_title)
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
			if (youtubeId == 'F5o494pRTPs') {
				var youtube_title = "デレステ " + song + " " + idol2 + " " + idol3 + " " + idol4; 
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

			if (youtubeId == 'F5o494pRTPs') {
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
			actual_song_name = 'Default (14平米スーベニア by Koharu)';
			var o = new Option(actual_song_name, actual_song_name);
			$(o).html(actual_song_name);
			$("#song").append(o);
			if (document.getElementById("song")[0].value == "null"){
				document.getElementById("song").remove(document.getElementById("song")[0]);
			}
			grayOut()
		}

		function grayOut(){
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