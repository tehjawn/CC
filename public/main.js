$.ajax({
    url: "localhost:8023",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password")); 
    },
    Authorization: "Bearer c66c588c23ab41e3be10446a89499020",
    'ocp-apim-subscription-key': "22e17226-e86d-4206-bb01-f1e87c99af5d",
    type: 'POST',
    success: function (data) {
      alert(JSON.stringify(data));
    },
    error: function(){
      alert("Cannot get data");
    }
});