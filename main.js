		//function for automatically changing idol names so no duplicates occur 
		function selectcontrol(number) {
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

			var songs = document.getElementsByName("song");
			for(i=0;i<songs.length;i++) {
				if (songs[i].checked){
					var song = songs[i].value
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

			var youtube_title = "デレステ " + song + " " + idol1 + " " + idol2 + " " + idol3 + " " + idol4 + " " + idol5;
			
			for (i=0;i<data.length;i++) {
				
				if (youtube_title == data[i][0]) {
					var youtubeId = data[i][1];
					break;
				}
				else {
					var youtubeId = 'F5o494pRTPs'
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
					var youtubeId = 'F5o494pRTPs'
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
					var youtubeId = 'F5o494pRTPs'
					}
				}
			}
			var youtubeLink = "https://www.youtube.com/embed/" + youtubeId;
			document.getElementById("embed-video").src = youtubeLink;			
		}

		function grayOut(){
			var song_names = document.getElementsByName("song");
			for (i=1;i<song_names.length+1;i++) {
				if (document.getElementById('song' + i).checked) {
					song_name = document.getElementById('song' + i).value;
				};
			};
			//bandaid fix, todo-> to implement function that checks catalog for number of singers in a song 
			if (song_name == "夢をのぞいたら（for BEST3 VERSION）"|| song_name == "とんでいっちゃいたいの") {
				$("#idol1").attr("disabled", true);
				$("#idol5").attr("disabled", true);
			}
			else {
				$("#idol1").attr("disabled", false);
				$("#idol5").attr("disabled", false);

			}
		}