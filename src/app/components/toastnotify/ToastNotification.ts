
import Timer = NodeJS.Timer;
export class ToastNotification {
 
  public showToast (message:string,title?:string,type?:ToastEnum,autoHide?:boolean,id?:string):Toast{

    let toast:Toast = new Toast(message,title,type,autoHide);
    
    if(id) {
    	toast.show(id);
	} else {
		toast.show("body");
	}
    Toast.toasts.push(toast);
    return toast;
  }

  public hideAll (){
    for(let i in Toast.toasts){
      Toast.toasts[i].hide();
    }
    Toast.toasts = [];
  }

}

export class Toast  {
 
  protected static toastContainer:HTMLDivElement = null;

  protected static isToastContainerAttached:boolean = false;

  public static toasts:Array<Toast> = [];

  
  private alertElement:HTMLDivElement;

  private message:string;
  private title:string;
  private type:ToastEnum;
  private autoHide:boolean;
  private autoHideTimeout:number;
  private timeoutInstance:Timer;
  
  constructor(message:string,title?:string,type?:ToastEnum,autoHide?:boolean,autoHideTimeout?:number){
    Toast.createToastContainer();
    this.message = message;
    this.title = title;
    this.type = type;
    this.autoHideTimeout = autoHideTimeout;

    if(!this.type){
      this.type = ToastEnum.Success;
    }else{
      this.autoHideTimeout *=1000;
    }
    if(this.autoHide==null || this.autoHide==undefined){
      this.autoHide = true;
    }
    if(!this.autoHideTimeout){
      this.autoHideTimeout = 30000;
    }

  }

  private static createToastContainer(){
    if(Toast.toastContainer===null){
      Toast.toastContainer = document.createElement('div');
      Toast.toastContainer.id = "toast-container";
      Toast.toastContainer.className = "right";
    }
  }

  protected static removeContainerIfEmpty(){
    if(!Toast.toastContainer){
      return;
    }
    if(Toast.toastContainer.hasChildNodes()===false || Toast.toastContainer.innerHTML=='' || Toast.toastContainer.innerText==''){
      Toast.toastContainer.remove();
      Toast.isToastContainerAttached = false;
    }
  }

 
  private getAlertClass():string{
    switch (this.type){
      case ToastEnum.Default:
        return 'alert-default';
      case ToastEnum.Danger:
        return 'alert-danger';
      case ToastEnum.Success:
        return 'alert-success';
      case ToastEnum.Info:
        return 'alert-info';
      case ToastEnum.Warning:
        return 'alert-warning';
      default:
        throw Error('Unsupported  type');
    }
  }
  
  private getGlyphicon():string{
    switch (this.type){
      case ToastEnum.Default:
        return 'glyphicon-info-sign';
      case ToastEnum.Danger:
        return 'glyphicon-remove-circle';
      case ToastEnum.Success:
        return 'glyphicon-ok-circle';
      case ToastEnum.Info:
        return 'glyphicon-info-sign';
      case ToastEnum.Warning:
        return 'glyphicon-warning-sign';
      default:
        throw Error('Unsupported type');
    }
  }
  
  private createToast (id:string){

    // get the first body child
    // let first = document.body.my-app.navbar.children[0];
    //let first=document.getElementsByTagName("router-outlet")[0];
    let first = document.getElementById(id);

    this.alertElement = document.createElement('div');
    let closeElement = document.createElement('span');
    let className = `alert ${this.getAlertClass()}`;
    this.alertElement.className = className + ' pre-enter';
    closeElement.innerHTML = '&times;';
    closeElement.className = 'close';

    this.alertElement.innerHTML = `<i class="alert-icon glyphicon ${this.getGlyphicon()}"></i> ${this.message}`;
    this.alertElement.appendChild(closeElement);

    closeElement.addEventListener('click',()=>{
      this.removeToast();
    });
    if(Toast.isToastContainerAttached===false){
      //document.body.appendChild(Toast.toastContainer);
      first.insertBefore(Toast.toastContainer,first.children[0]);
      Toast.isToastContainerAttached = true;
    }
    Toast.toastContainer.appendChild(this.alertElement);

    // insert in body first
   // document.body.insertBefore(this.alertElement, first);

    setTimeout(()=>{this.alertElement.className = className + ' entered'},100);
    this.enableAutohideIfNecessary();

  }

  private enableAutohideIfNecessary(){

    if(this.autoHide==false){
      return;
    }

    this.timeoutInstance = setTimeout(()=>{
      this.hide();
    },this.autoHideTimeout)

  }

  private removeToast(){
    if(this.alertElement){
      let className = `alert-icon alert ${this.getAlertClass()}`;
      this.alertElement.className = className + ' exiting';
      //give some time about 600ms for exiting
      setTimeout(()=>{
        this.alertElement.remove();
        //remove the toast from the container
        Toast.toasts.splice(Toast.toasts.indexOf(this),1);
        //unset the timeout
        clearTimeout(this.timeoutInstance);
        Toast.removeContainerIfEmpty();
      },500);
    }
  }

  public show (id:string){
    this.createToast(id);
  }

  public hide (){
    this.removeToast();
  }
}

export enum ToastEnum {
  Default,
  Success,
  Danger,
  Warning,
  Info,
}