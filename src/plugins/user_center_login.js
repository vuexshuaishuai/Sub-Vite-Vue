(function(window){
    function adminUserCenter(){
      //变量 --HTTP请求域名
        var domain= '';
      //变量 --唤起UserCenter的业务线域名
      var domain_nginx= '';
      // console.log('打印domain==',domain)
      // console.log('打印domain_nginx==',domain_nginx)
      var option_record;
      //初始化弹窗通讯
      function initAdminModal(option){
        var that = this;
        if(document.getElementById('businesslineIframe')) return;
        //把接收的参数挂在构造函数属性上 方便后面使用
        initEnv(option && option.env || '');
        this.prototypeOpt=option;
        var wrapElementId=option.wrapElementId?document.getElementById(option.wrapElementId):document.body;
        var businesslineIframeElement=document.createElement('iframe');
        businesslineIframeElement.id='businesslineIframe';
        businesslineIframeElement.src='';
        businesslineIframeElement.style.border='0';
        businesslineIframeElement.style.width='100%';
        businesslineIframeElement.style.height='100%';
        businesslineIframeElement.style.position='fixed';
        businesslineIframeElement.style.left='0';
        businesslineIframeElement.style.top='0';
        businesslineIframeElement.style.display='none';
        businesslineIframeElement.frameborder='0';
        wrapElementId.appendChild(businesslineIframeElement);
        //埋好监听事件
        window.addEventListener("message", function(event){
          if(event.origin!=domain_nginx) return;
          var obj = event.data;
          if (obj && obj.info === "success" && obj.type === "usercenter") {
            if(obj.data=='closeModel'){//约定'closeModel'为关闭弹窗
              businesslineIframeElement.src='';
              businesslineIframeElement.style.display="none";
            }
            if(obj.data=='forgetPwd'){//约定'forgetPwd'为忘记密码跳转
              var backRedirect=window.location.href;
              window.open(domain+'?backRedirect='+encodeURIComponent(backRedirect)+'&merchantcode='+option_record.merchantcode+'/#/forget')
            }
            if(obj.data=='loginSuccess'){//约定'loginSuccess'为登录成功--返回ticket
              if(obj.msg){
                option.loginSuccess(obj.msg);
              }
            }
            if(obj.data=='changeIndex'){//约定'changeIndex'为通知父级切换iframe层级 参数：close--降低 open--提高
              if(obj.msg){
                if(obj.msg=='close'){
                  option.changeIndex('close');
                }else if(obj.msg=='open'){
                  option.changeIndex('open');
                }
              }
            }
            if (obj.data == 'isClient'){ //约定'isClient'车旺平台特殊处理                    
              var r1 = window.location.href.indexOf('zjcw.cn') > -1 || window.location.href.indexOf('wccyrdemo.sinoiov.cn') > -1;
              var r2 = window.location.href.indexOf('?client=200') > -1;                                
              if(r1 && r2){
                  var opt = {
                      data:"client",
                  }                           
                 that.sendMessage(opt);                            
              } 
          
            }
          }
        });
      }
      //打开弹窗操作
      function openAdminModal(opt){
        if(!opt.merchantcode || opt.merchantcode==''){
          return
        }
        option_record=opt;
        //拼接query参数
        var str='?';
        if(opt){
          var index=0;
          for(var i in opt){
            if(index==0){
              var timer=new Date().getTime();
              str+=i+'='+opt[i];
              str+='&timer='+timer
            }else{
              str+='&'+i+'='+ encodeURIComponent(opt[i])
            }
            index+=1;
          }
        }
        var businesslineIframe=document.getElementById('businesslineIframe');
        if(str!='?'){
          businesslineIframe.src=domain+str;
        }else{
          businesslineIframe.src=domain;
        }
        businesslineIframe.style.display='block';
      }
      //发送通知给登录弹窗
      function sendMessage(option){
        var businesslineIframe=document.getElementById('businesslineIframe');
        businesslineIframe.contentWindow.postMessage(option, domain);
      }
  
      // 初始化企业认证弹窗
      function initIdentificationModal(option){
        // if(document.getElementById('identificationIframe')) return;
        initEnv(option && option.env || ''); // 初始化环境
        var wrapElementId=option.wrapElementId?document.getElementById(option.wrapElementId):document.body;
        var businesslineIframeElement=document.createElement('iframe');
        businesslineIframeElement.id='identificationIframe';
        businesslineIframeElement.src='';
        businesslineIframeElement.style.border='0';
        businesslineIframeElement.style.width='100%';
        businesslineIframeElement.style.height='100%';
        businesslineIframeElement.style.display='none';
        businesslineIframeElement.frameborder='0';
        wrapElementId.appendChild(businesslineIframeElement);
        //埋好监听事件
        window.addEventListener("message", function(event){
          if(event.origin!=domain_nginx) return;
          var obj = event.data;
          option.callback && option.callback(obj)
        });
      }
      // 打开企业认证弹窗
      function openIdentificationModal(opt){
        console.log(opt)
        if(!opt || !opt.merchantcode){
          return
        }
        option_record=opt;
        //拼接query参数
        var toUrl = opt.toUrl || 'identification'
        delete opt.toUrl
        var str='?origin='+encodeURIComponent(window.origin) +'&timer=' + new Date().getTime();
        for(var i in opt){
          str+='&'+i+'='+ encodeURIComponent(opt[i])
        }
        var businesslineIframe=document.getElementById('identificationIframe');
        businesslineIframe.src=domain+str+'#/'+toUrl;
        businesslineIframe.style.display='block';
      }
  
      // 初始化环境
      function initEnv(env){
        var envMap = {
          'local': location.protocol+'//localhost:8080',
          'dev': location.protocol+'//dev-usercenter.95155.com',
          'test': location.protocol+'//test-usercenter.95155.com',
          'prod': location.protocol+'//usercenter.95155.com'
        };
        if(!env){
          if(/localhost|192\.168/.test(location.host)) {
            env = 'local';
          }else if(/dev/.test(location.host)) {
            env = 'dev';
          }else if(/test/.test(location.host)){
            env = 'test';
          }else{
            env = 'prod';
          }
        }
  
        domain = env == 'local' ? envMap[env] : envMap[env] + '/pc';
        domain_nginx = envMap[env];
      }
      
      this.initAdminModal=initAdminModal;
      this.openAdminModal=openAdminModal;
      this.initIdentificationModal = initIdentificationModal;
      this.openIdentificationModal = openIdentificationModal;
  
      this.sendMessage=sendMessage;
    }
    window.adminUserCenter=new adminUserCenter();
  })(window)