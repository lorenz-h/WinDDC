const ddcci = require("@hensm/ddcci");
var slider = document.getElementById("brighness_slider");
var monitor = ddcci.getMonitorList()[0];

try {
    slider.value = ddcci.getBrightness(monitor)
    console.log(`${monitor} current brightness: ${slider.value}`);
}
catch(err) {
    console.log("No compatible monitor found!");
    document.getElementById("error_message").style.display = "block";
    slider.value = 0;
}
slider.oninput = function() {
    console.log(`${monitor} setting brightness to ${this.value}`);
    try{
        ddcci.setBrightness(monitor, parseInt(this.value));
    }
    catch(err){
        console.log("No compatible monitor found!");
    }
    
} 

document.getElementById("close_btn").addEventListener("click", function(){
    console.log("closing window...")
    window.self.close()
})