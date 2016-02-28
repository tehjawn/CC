$(document).ready(function () {
                $('.test-button').click(function () {
                    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

                    if (window.SpeechRecognition == null) {
                        console.log('empty');
                    } else {
                        var recognizer = new window.SpeechRecognition();
                        recognizer.continuous = false;
                        var text;
                        recognizer.onresult = function (event) {
                            for (var i = event.resultIndex; i < event.results.length; i++) {
                                if (event.results[i].isFinal) {
                                    text = event.results[i][0].transcript;
                                } else {
                                    text += event.results[i][0].transcript;
                                }
                            }
                            console.log(text);
                            $.ajax({
                                type: "POST",
                                url: "/",
                                data: { input: text },
                                success: function(data){
                                    console.log(data);
                                    responsiveVoice.speak("You did " + data.number + data.activity, "UK English Female");

                                }
                            });
                        };
                        recognizer.onerror = function (error) {
                            console.log(error); 
                        };
                        try {
                            recognizer.start(); // SUCCESS
                        } catch (ex) {
                            console.log(ex.message);
                        }
                    }
                });
            });