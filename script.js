// <loadIn() Function
// <This handler preps all the other handles for every jquery function that is needed>
//
// @return: none
// @param: none
$( document ).ready(function() {
//------------ LOGIN PAGE METHODS ------------
    // <hideAlerts() Function
    // <Global function that handles hiding all alert elements>
    // @return: none
    // @param: none
    $(".alert").hide();
    
    // <dismissAlert() Function
    // <Functions dedicated to dismissing alert functions>
    // @return: none
    // @param: none
    $("#hideIncorrectPass").click(function(e){
        $("#incorrectPass").hide();
    });
    $("#hideSuccessBugReport").click(function(e){
        $("#successBugReport").hide();
    });


    // <loginHandler(e) Function
    // <Handles the sign in commaned and redirect from main page. Currently hard-coded but later will be linked with a server.>
    // @return: none
    // @param: 
    //      - e, the jquery event object to be cancelled
    $("#login").submit(function(e) {
        e.preventDefault();
        data = $(":input").serializeArray();
        
        userName = data[0].value;
        password = data[1].value;
        if (userName == "teacher" && password == "teacher") {
            // Login and redirect to teacher page
            console.log("Teacher Login");
            window.location.replace("https://gak00.github.io/g3cs2450f19.github.io/teacher/student-list.html");
        } else if (userName == "student" && password == "student") {
            window.location.replace("https://gak00.github.io/g3cs2450f19.github.io/student/abacus.html");
        } else if (userName == "IT" && password == "IT") {
            window.location.replace("https://gak00.github.io/g3cs2450f19.github.io/IT/report-bug.html");
        } else {
            $("#incorrectPass").show();
        }
        $(".form-control").val("");
    });


    // <submitBugReportHandler(e) Function
    // <Handles the IT dept. submission of bugs>
    // @return: none
    // @param:
    //      - e, the jquery event object to be cancelled
    $("#submitBugReport").submit(function(e) {
        e.preventDefault();
        $("#submitBugReport").get(0).reset();
        $("#successBugReport").show();
    });

});

