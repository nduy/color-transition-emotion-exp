/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var index=0;
var questions = ["1.  Bạn nhìn thấy CHỮ SỐ nào?", // 1
                 "2.  Bạn nhìn thấy CHỮ SỐ nào?", // 2
                 "3.  Bạn nhìn thấy CHỮ SỐ nào?", // 3
                 "4.  Bạn nhìn thấy CHỮ SỐ nào?", // 4
                 "5.  Bạn nhìn thấy CHỮ SỐ nào?", // 5
                 "6.  Bạn nhìn thấy CHỮ SỐ nào?", // 6
                 "7.  Bạn nhìn thấy CHỮ SỐ nào?", // 7 
                 "8.  Bạn nhìn thấy CHỮ SỐ nào?", // 8
                 "9.  Bạn nhìn thấy CHỮ SỐ nào?", // 9 
                 "10. Bạn nhìn thấy CHỮ SỐ nào?", // 10
                 "11. Bạn nhìn thấy CHỮ SỐ nào?", // 11 
                 "12. Bạn nhìn thấy CHỮ SỐ nào?", // 12
                 "13. Bạn nhìn thấy CHỮ SỐ nào?", // 13 
                 "14. Bạn nhìn thấy CHỮ SỐ nào?", // 14
                 "15. Bạn nhìn thấy CHỮ SỐ nào?", // 15 
                 "16. Bạn nhìn thấy CHỮ SỐ nào?", // 16
                 "17. Bạn nhìn thấy CHỮ SỐ nào?", // 17 
                 "18. Bạn nhìn thấy bao nhiêu ĐƯỜNG cong?", // 18
                 "19. Bạn nhìn thấy CHỮ SỐ nào?", // 19
                 "20. Bạn nhìn thấy bao nhiêu ĐƯỜNG cong?",  // 20
                 "21. Bạn nhìn thấy bao nhiêu ĐƯỜNG cong?",  // 21 
                 "22. Bạn nhìn thấy bao nhiêu ĐƯỜNG cong?",  // 22
                 "23. Bạn nhìn thấy bao nhiêu ĐƯỜNG cong?",  // 23 
                 "24. Bạn nhìn thấy bao nhiêu ĐƯỜNG cong?"   // 24
                ];
var options = [["A1","A2","A3"], 
               ["B1","B2","B3"],
               ["C1","C2","C3"], 
               ["D1","D2","D3"],
               ["E1","E2","E3"], 
               ["F1","F2","F3"],
               ["G1","G2","G3"], 
               ["H1","H2","H3"],
               ["I1","I2","I3"], 
               ["J1","J2","J3"],
               ["K1","K2","K3"], 
               ["L1","L2","L3"],
               ["M1","M2","M3"], 
               ["N1","N2","N3"],
               ["O1","O2","O3"], 
               ["P1","P2","P3"],
               ["Q1","Q2","Q3"], 
               ["R1","R2","R3"],
               ["S1","S2","S3"], 
               ["T1","T2","T3"],
               ["U1","U2","U3"], 
               ["V1","V2","V3"],
               ["W1","W2","W3"], 
               ["X1","X2","X3"]
                ];
var usr_answers = [];
var previousAnswers=["first","second","third"];
$(document).ready(function(){
    //alert("Bee");
    
    overlay(1);
    handleClick(); // Initialize the first dish
});

/* 
 * Function to handle a user submit. It pass data to script.js for 
 * further process and load new dish
 * No parameters
 */
function handleClick()
      {
        // Record choices
        if (index!=0){
            usr_answers.push($('input[name="answer"]:checked').val());
            //alert(usr_answers);
        }
        // Load new dish
        if (index<24){
            if (index==17) {// grading first time
                grd = gradingAgent(usr_answers);
//                alert(grd);
                if (grd!=-1 && grd<0.1) // Test score is not undefined nor RG-rate <20%
                {
                    overlay(2);
                }
                    
            }
            loadDish(++index);
            //event.preventDefault(); // disable normal form submit behavior 
        } else{
//            alert(usr_answers);
            // Decision making here
            grd = gradingAgent(usr_answers);
                if (grd!=-1 && grd<0.2) // Test score is not undefined nor RG-rate <220%
                {
                    overlay(2);
                }
                else {
                    overlay(3);
                }
            // Move to another state
        }
        
        return false; // prevent further bubbling of event
      }

/* 
 * Automatically click a checkbox when its label is clicked
 * @parameter: label: indicate the lable 1th, 2th 3th
 */
function handleLabelClick(l)
      {
        switch (l){
            case 1:  
                document.getElementById("check-radio-1").checked=true;
                handleClick();
                break;
            case 2:  
                document.getElementById("check-radio-2").checked=true;
                handleClick();
                break;
            case 3:  
                document.getElementById("check-radio-3").checked=true;
                handleClick();
                break;
        }
      }

/* 
 * Function to load each of 24 dish 
 * Parameters
 * @dishindex: index of the dish (from 1 to 24)
 */      
function loadDish(dishindex){
        var imgElement =  $("#dishimg");
        imgElement.attr("src", "img/plates/" + dishindex + ".png");
        imgElement.attr("alt","dish "+ dishindex + " image.");
        $("#question").text(questions[dishindex-1]);
        for (var i=0; i<3; i++) {
            var ele = $('input:radio[name="answer"][value ="'+previousAnswers[i]+'"]');
            ele.prop('value', options[dishindex-1][i]);
            ele.prop('checked',false); // Clear all check

            document.getElementById("line-radio-"+(i+1)).textContent =  optionLookup(options[dishindex-1][i]);
        }
        $('input[type="submit"]').prop('disabled', true); // Disable submit button
        previousAnswers =  options[dishindex-1];
        return false;
    }
 
/* 
 * Function to avoid people submit empty response.
 * Basically, it keep submit button disabled until prople made a dicision.
 * No Parameters
 */      
function selectionValidate(){
        //alert($('input[name="answer"]:checked').val());
        $('input[type="submit"]').prop('disabled', false);
        return false;
    }

/* 
 * Function serve as dictionary look up for each options.
 * Parameters:
 * @opID: option ID. 
 *  - A1: first option of dish  A
 *  - A2: second option of dish  A
 *  ...
 */      
function optionLookup(opID){
    switch(opID) {
    case "A1": return "12."; break; // Correct
    case "A2": return "15."; break;
    case "A3": return "Không phải một số / Khác."; break;
    case "B1": return "3"; break;
    case "B2": return "8"; break;
    case "B3": return "Không phải một số / Khác."; break;
    case "C1": return "70."; break;
    case "C2": return "29."; break;
    case "C3": return "Không phải một số / Khác."; break;
    case "D1": return "2."; break;
    case "D2": return "5."; break;
    case "D3": return "Không phải một số / Khác."; break;
    case "E1": return "5."; break;
    case "E2": return "3."; break;
    case "E3": return "Không phải một số / Khác."; break;
    case "F1": return "15."; break;
    case "F2": return "17."; break;
    case "F3": return "Không phải một số / Khác."; break;
    case "G1": return "21."; break;
    case "G2": return "74."; break;
    case "G3": return "Không phải một số / Khác."; break;
    case "H1": return "6."; break;
    case "H2": return "8."; break;
    case "H3": return "Không phải một số / Khác."; break;
    case "I1": return "15."; break;
    case "I2": return "45."; break;
    case "I3": return "Không phải một số / Khác."; break;
    case "J1": return "6."; break;
    case "J2": return "5."; break;
    case "J3": return "Không phải một số / Khác."; break;   
    case "K1": return "1."; break;
    case "K2": return "7."; break;
    case "K3": return "Không phải một số / Khác."; break;
    case "L1": return "16."; break;
    case "L2": return "76."; break;
    case "L3": return "Không phải một số / Khác."; break;
    case "M1": return "18."; break;
    case "M2": return "73."; break; 
    case "M3": return "Không phải một số / Khác."; break;
    case "N1": return "5."; break;
    case "N2": return "3."; break;
    case "N3": return "Không phải một số / Khác."; break;
    case "O1": return "45."; break;
    case "O2": return "9."; break;
    case "O3": return "Không phải một số / Khác."; break;
    case "P1": return "26."; break;
    case "P2": return "2 hoặc 6."; break;
    case "P3": return "Không phải một số / Khác."; break;
    case "Q1": return "2 hoặc 4."; break;
    case "Q2": return "42."; break;
    case "Q3": return "Không phải một số / Khác."; break;
    case "R1": return "Không có đường nào."; break;
    case "R2": return "1 đường."; break;
    case "R3": return "2 đường."; break;
    case "S1": return "Không có đường nào."; break;
    case "S2": return "1 đường khúc khủy."; break; 
    case "S3": return "Khác."; break;
    case "T1": return "1 đường khúc khủy."; break;
    case "T2": return "2 đường khúc khủy."; break;
    case "T3": return "Khác."; break;
    case "U1": return "1 đường khúc khủy."; break;
    case "U2": return "2 đường khúc khủy."; break;
    case "U3": return "Khác."; break;
    case "V1": return "Không có đường nào."; break;
    case "V2": return "1 đường liên tục."; break;
    case "V3": return "1 đường đứt khúc."; break;    
    case "W1": return "Không có đường nào."; break;
    case "W2": return "1 đường liên tục."; break;
    case "W3": return "1 đường đứt khúc."; break; 
    case "X1": return "Không có đường nào."; break;
    case "X2": return "1 đường."; break;
    case "X3": return "Khác."; break;; 
    default:
        return "Khác.";
    }
}

/* 
 * Grading reference
 * As a choice is made, this function return the diagnisis related to that decision
 * Parameters:
 * @opID: code of choice: A1, A2, B1, C1...
 * @return: relaated code: 
 * - Normal: indicete this is the choice of NORMAL person
 * - RGDef: indicete this is the choice of RED-GREEN defection person
 * - Total: indicete this is the choice of TOTAL COLOR BLIND defection person
 * - X: indicete this is the choice of UNDEFINED defection person (a stupid choice - not a human) ^^
 */ 
function answerLookup(opID){
    switch(opID) {
        case "A1": return "Normal"; break;
        case "A2": return "X";      break;
        case "A3": return "X";      break;
        case "B1": return "RGDef";  break;
        case "B2": return "Normal"; break;
        case "B3": return "Total";  break;
        case "C1": return "RGDef";  break;
        case "C2": return "Normal"; break;
        case "C3": return "Total";  break;
        case "D1": return "RGDef";  break;
        case "D2": return "Normal"; break;
        case "D3": return "Total";  break;
        case "E1": return "RGDef";  break;
        case "E2": return "Normal"; break;
        case "E3": return "Total";  break;
        case "F1": return "Normal"; break;
        case "F2": return "RGDef";  break;
        case "F3": return "Total";  break;
        case "G1": return "RGDef";  break;
        case "G2": return "Normal"; break;
        case "G3": return "Total";  break;
        case "H1": return "Normal"; break;
        case "H2": return "X";      break;
        case "H3": return "Total";  break;
        case "I1": return "X";      break;
        case "I2": return "Normal"; break;
        case "I3": return "Total";  break;
        case "J1": return "X";      break;
        case "J2": return "Normal"; break;
        case "J3": return "Total";  break;
        case "K1": return "X";      break;
        case "K2": return "Normal"; break;
        case "K3": return "Total";  break;
        case "L1": return "Normal"; break;
        case "L2": return "X";      break;
        case "L3": return "Total";  break;
        case "M1": return "X";      break;
        case "M2": return "Normal"; break;
        case "M3": return "Total";  break;
        case "N1": return "RGDef";  break;
        case "N2": return "X";      break;
        case "N3": return "Normal"; break;
        case "O1": return "RGDef";  break;
        case "O2": return "X";      break;
        case "O3": return "Normal"; break;
        case "P1": return "Normal"; break;
        case "P2": return "RGDef";  break;
        case "P3": return "Total";  break;
        case "Q1": return "RGDef";  break;
        case "Q2": return "Normal"; break;
        case "Q3": return "Total";  break;
        case "R1": return "Total";  break;
        case "R2": return "RGDef";  break;
        case "R3": return "Normal"; break;
        case "S1": return "Normal"; break;
        case "S2": return "RGDef";  break;
        case "S3": return "RGDef";  break;
        case "T1": return "Normal"; break;
        case "T2": return "X";      break;
        case "T3": return "RGDef";  break;
        case "U1": return "Normal"; break;
        case "U2": return "X";      break;
        case "U3": return "RGDef";  break;
        case "V1": return "Total";  break;
        case "V2": return "Normal"; break;
        case "V3": return "RGDef";  break;
        case "W1": return "Total";  break;
        case "W2": return "Normal"; break;
        case "W3": return "RGDef";  break;
        case "X1": return "Total";  break;
        case "X2": return "Normal"; break;
        case "X3": return "X";      break;
    default:
        return "Other.";
    }
}

/*
 * Primary grading function
 * The function make the dicision whether the subject is corlor-blind or not. 
 * The grading is performed after dish 17 and 24.
 * @Pram: user_ans user's answer. The size 24 array contains all responses of the 
 * @Return: percentage of RG color blind (0 mean totally normal) -1 if invalid grading
 */
function gradingAgent(user_ans){ 
    var len = user_ans.length;
    switch (len){
        case 17:
            // Count recieved normal and RGDef
            var normal_count=0;
            var rgdef_count=0;
            var tobln_count=0;
            for (i = 0; i<15; i++ ){
                var ans = answerLookup(user_ans[i]);
                //console.log(ans);
                if (ans==="RGDef") rgdef_count++;
                else if (ans==="Normal") normal_count++;
                else if (ans==="Total" || ans==="X") tobln_count++;
                
            }
//            console.log(rgdef_count + "  " + normal_count + "  " + tobln_count);
            if (normal_count>=13) return 0;
            else if (normal_count<=9) return Math.max(rgdef_count,tobln_count)/15;
            else{ // further investigate case correct 10, 11, 12 times out of 17
                var original_normal_count= normal_count;
                for (i = 15; i<17; i++ ){ // 2 dish - 16-17
                    var ans = answerLookup(user_ans[i]);
                    if (ans==="RGDef") rgdef_count++;
                    else if (ans==="Normal") normal_count++;
                    else if (ans==="Total"|| ans==="X") tobln_count++;
                }
                
                if (normal_count>original_normal_count) return 0;
                else return Math.max(rgdef_count,tobln_count)/15;
            }
            
            break;
        case 24:
            var normal_count=0;
            var rgdef_count=0;
            var tobln_count=0;
            for (i = 0; i<24; i++ ){
                var ans = answerLookup(user_ans[i]);
                if (ans==="RGDef") rgdef_count++;
                else if (ans==="Normal") normal_count++;
                else if (ans==="Total"|| ans==="X") tobln_count++;
            }
            return Math.max(rgdef_count,tobln_count)/24;
            break;
        default:
            return -1;
            break;
    }
}

/*
 * Call overlay windows
 * Paramters: index: 
 * - 1: welcome message
 * - 2: Ishihara report POSITIVE
 * - 3: Ishihara report NEGATIVE
 * 
 * - -1 (minus 1): hide the overlay
 * */

function overlay(index) {
	el = document.getElementById("overlay");
	el.style.visibility = "visible";
        switch (index){
            case -1:
                document.getElementById("welcome_message").style.display = "none";
                document.getElementById("vision_test_message_positive_ishihara").style.display = "none";
                document.getElementById("vision_test_message_negative_ishihara").style.display = "none";
                document.getElementById("vision_test_message_positive_screenassess").style.display = "none";
                document.getElementById("vision_test_message_negative_screenassess").style.display = "none";
            //    document.getElementById("overlay").style.visibility = "hidden";
                break;
            case 1:
                overlay(-1);
                elx = document.getElementById("welcome_message");
                elx.style.display = (elx.style.display == "block") ? "none" : "block";
//                  overlay(-1);
//                  showSection("welcome_message");
                break;
            case 2:
                overlay(-1);
                elx = document.getElementById("vision_test_message_positive_ishihara");
                elx.style.display = (elx.style.display == "block") ? "none" : "block";
//                  overlay(-1);
//                  showSection("vision_test_message_positive_ishihara");
                break;
            case 3:
                overlay(-1);
                elx = document.getElementById("vision_test_message_negative_ishihara");
                elx.style.display = (elx.style.display == "block") ? "none" : "block";
//                  overlay(-1);
//                  showSection("vision_test_message_negative_ishihara");
                break;   
            case 4:
                overlay(-1);
                elx = document.getElementById("vision_test_message_positive_screenassess");
                elx.style.display = (elx.style.display == "block") ? "none" : "block";
//                alert(elx.style.display);
//                  overlay(-1);
//                  showSection("vision_test_message_positive_screenassess");
                break;
            case 5:
                overlay(-1);
                elx = document.getElementById("vision_test_message_negative_screenassess");
                elx.style.display = (elx.style.display == "block") ? "none" : "block";
//                alert(elx.style.display);
//                  overlay(-1);
//                  showSection("vision_test_message_negative_screenassess");
                break;
        }
}

/*
 * Call hide a section
 * Paramters: sectionID: 
 * */
function hideSection(sectionID) {
    if (sectionID!=="")
        document.getElementById(sectionID).style.visibility= "hidden";
}

/*
 * Call ro hide ALL known Sections
 * No param
 * */
function hideAllSections() {
    document.getElementById("ishihara_section").style.visibility= "hidden";
    document.getElementById("color-assesment-single-color").style.visibility= "hidden";
    document.getElementById("color-assesment-double-color").style.visibility= "hidden";
}

/*
 * Call show a section
 * Paramters: sectionID: 
 * */
function showSection(sectionID) {
    if (sectionID!=="")
        hideAllSections();
        overlay(-1);
        document.getElementById("overlay").style.visibility = "hidden";
        document.getElementById(sectionID).style.visibility= "visible";
}

/*
 * Call hide a section, then show the other
 * Paramters: hideSectionID,  showSectionID
 * */
function hideaSectiontAndShowAnother(hideSectionID,showSectionID) {
    if (hideSectionID!=="" && showSectionID!==""){
        hideSection(hideSectionID);
        showSection(showSectionID);
    }
}

/*
 * Call hide a section, then show the other
 * Paramters: hideSectionID,  showSectionID
 * */
function screenTestGrading(){
    // Collect data inputed by user
    // Get score of the first test (single color)
    scrtest_user_answers = [];
    correct_anwers=[false,true,true,true,false,true,true,true,false,false,false,false,true,false,false,true,false,true,false];
                 // 1.1  1.2   1.3  1.4  1.5   1.6  1.7  1.8  2.1  2.2   2.3   2.4   2.5   2.6   2.7   2.8  2.9  2.10  2.11
                 //       T     T    T          T    T    T                            T                T          T
    correct_count =0;
    for (i=1; i<=8; i++){
       // alert('myonoffswitch-1-'+i);
         scrtest_user_answers.push(document.getElementById('myonoffswitch-1-'+i).checked);
         if (scrtest_user_answers[i-1] === correct_anwers[i-1]) correct_count++;
    }
    for (i=9; i<=19; i++){
       // alert('myonoffswitch-1-'+i);
         scrtest_user_answers.push(document.getElementById('myonoffswitch-2-'+(i-8)).checked);
         if (scrtest_user_answers[i-1] === correct_anwers[i-1]) correct_count++;
    }
    //alert(scrtest_user_answers);
    // Hide all sections
    hideAllSections();
    // Grading
    //alert(correct_count);
    if (correct_count/19>=0.5) overlay(4);
    else overlay(5);
    
    return;
}

/*
 * Redirect to another page
 * Paramters: pageURL
 * */
function PageRedirect(url){
    //window.location = url;
//    window.open(url, 'newwindow');
    window.open(url, "", "width="+ window.innerWidth +",height="+window.innerHeight);
    var win = window.open("","_self"); /* url = "" or "about:blank"; target="_self" */
    win.close();
}


/* 
 * Enable full screen and show experiment
 */

function kickStart(){
    overlay(-1); // Hide welcome message
    showSection('color-assesment-single-color');//  Show section
}


/*
 * Hide the tool tip Click the to switch between yes/no
 */
function HideToolTipClickHere(){
    $( "#tooltipclick").css("visibility","hidden");
}
