/**
 * ...
 * @author Anna
 */

(function() {
	
		var d = new Date();
		var date = d.getDate();
		var year = d.getFullYear();
		var month = d.getMonth();
		
		var current_date 	= date;
		var current_month 	= month;
		var current_year 	= year;
		
		var months=new Array("Январь","Февраль","Март","Апрель","Май","Июнь", "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь");
		var months_count_days=new Array(31,28,31,30,31,30, 31,31,30,31,30,31);
		
		addTextMounths();
		addMounthToHtml(current_month);
	
})();


function isLeapYear(year) {
		return year % 4 === 0;
	}
	function isLeap400Year(year) {
		return year % 400 === 0;
	}
	
    if (isLeapYear(year)) {
		months_count_days[1] = 29;
	}
	
	if (isLeap400Year(year)) {
		months_count_days[1] = 29;
	}
	
	var mounth_active = document.getElementById("mounth_active");
	var mounth_last = document.getElementById("mounth_last");
	var mounth_next = document.getElementById("mounth_next");
	
	
	function addMounthToHtml(localMonth) {
	
			var calendar = document.getElementById("calendar");
			
			   var day_columns_array = document.getElementById('calendar').getElementsByClassName('days_column');
			   var day = 1; 
			   
			 //  alert(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(2015, 5, 14).getDay()]);
			  // alert(new Date(2015, 5, 13).getDay());  	
			  
			   for (var i=0; i<day_columns_array.length; i++) {
				 
					var day_columns = day_columns_array[i];
					var div_days = day_columns_array[i].getElementsByClassName('days');
					
					for(j = 0; j < div_days.length; j++) {   // always =  1
						
						var week_coef = new Date(current_year, localMonth, 1).getDay();
						if (week_coef == 0) {
							week_coef = 7;
						}
						div_days[j].innerHTML = '';
						str = '';
						var row = 0;
						day = 1; 
					
						if ((i+1)>=week_coef)  {
							day = (i+1);
						}
						
						while (day<=months_count_days[localMonth]) {
							if (row == 0) {
								var current_weekday = new Date(current_year, localMonth, 1).getDay();
	
								if ( (i+1) >= current_weekday ) {
		
									day = ((i+1)-week_coef)+1;
									if (day<=0) {
										str += '<p>&nbsp</p>';
										day += 7;
									}
									str += '<p>'+ day +'</p>';
									day += 7;	
								} else {
									str += '<p>&nbsp</p>';
									day = (i-week_coef) + 7;
								}

							} else {
								str += '<p>'+ day +'</p>';
								day += 7;
							}	
							row++;			
						}		
						div_days[j].innerHTML = str;
					}	
			 }
			 
			 chooseDate();
	}
	
	
	function addTextMounths() {
		
		if (current_month == months.length-1)  {  // декабрь
			mounth_last.innerHTML = months[current_month-1] +' '+ current_year;
			mounth_next.innerHTML = months[0] +' '+ (current_year+1);
		} else {
			if (current_month == 0)  {  // январь  
				mounth_last.innerHTML = months[months.length-1] +' '+ (current_year-1);
				mounth_next.innerHTML = months[current_month+1] +' '+ current_year;
			} else {
				mounth_last.innerHTML = months[current_month-1] +' '+ current_year;
				mounth_next.innerHTML = months[current_month+1] +' '+ current_year;
			}
		}
		
		mounth_active.innerHTML = months[current_month] +' '+ current_year;	
	}
	
	
	function onClickArrowLeft() {
	
		if (current_month>0) {
			current_month -= 1;
		} else {
			if (current_year>0) {
				current_month = months.length-1;
				current_year -= 1;
			}
		}
		addMounthToHtml(current_month);
		addTextMounths();
	}
	
	function onClickArrowRight() {
	
		if (current_month<months.length-1) {
			current_month += 1;
		} else {
			current_month = 0;
			current_year += 1;	
		}
	
		addMounthToHtml(current_month);
		addTextMounths();
	}
	
	function chooseDate() {
	
		var calendar = document.getElementById("calendar");
		var anchors = calendar.getElementsByTagName('p');
        for(var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            anchor.onclick = function() {
               // alert(this.innerHTML);
				removeAllActive();
				this.className = 'active';
            }
        }
	}
	
	function removeAllActive() {
		var calendar = document.getElementById("calendar");
		var anchors = calendar.getElementsByTagName('p');
        for(var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
				anchor.className = '';          
        }
	}
