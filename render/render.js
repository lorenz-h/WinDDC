const ddcci = require("@hensm/ddcci");
const Mustache = require("mustache")

class MonitorControls{
    constructor(name, id){
        this.id = id;
        this.name = name;

        this.dom = this.create_dom()
        
        this.bs = this.dom.querySelector("#brighness_slider_" + this.id);
        this.cs = this.dom.querySelector("#contrast_slider_" + this.id);
        this.reset = this.dom.querySelector("#restore_" + this.id);

        try{
            this.get_initial_configuration()
            this.register_handlers()
        }
        catch(err) {
            console.log(`Could not Initialize Monitor ${this.name}`);
            console.log(err);
            this.bs.parentElement.parentElement.style.display = "none";
            this.cs.parentElement.parentElement.display = "none";
        }
        document.getElementById("monitor_controls_wrapper").append(this.dom);
    }


    reset_default_contrast_and_brightness(){

    }

    get_initial_configuration(){
        this.bs.value = ddcci.getBrightness(this.name)
        this.cs.value = ddcci.getContrast(this.name)
    }

    register_handlers(){
        let target = this
        this.bs.oninput = function() {
            console.log(`setting brightness to ${this.value}`);
            ddcci.setBrightness(target.name, parseInt(this.value));
        }
        this.cs.oninput = function() {
            console.log(`setting contrast to ${this.value}`);
            ddcci.setContrast(target.name, parseInt(this.value));
        }

        this.reset.onclick = function(){
            target.resetDefault(target.name)
        }
    }

    resetDefault(monitorName){
        console.log("resetting default contrast / brightness values")
        ddcci._setVCP(monitorName, 0x05, 1);
        this.get_initial_configuration()
    }

    create_dom(){
        let template = document.getElementById("monitor_control_item_template").innerHTML;
        let htmlString = Mustache.render(template, {name: this.name, id: this.id});

        let dom = document.createElement("div");
        dom.innerHTML = htmlString;
        dom.classList.add("monitor_controls_item");
        return dom
    }

}


const monitors = ddcci.getMonitorList();
console.log(`Found ${monitors.length} monitors`);
for (let i = 0; i < monitors.length; i++) {
    let mc = new MonitorControls(monitors[i], i);
}


