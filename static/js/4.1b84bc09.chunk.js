(this.webpackJsonpuntitled=this.webpackJsonpuntitled||[]).push([[4],{384:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__3GU_E",dialogsItems:"Dialogs_dialogsItems__3ANzm",active:"Dialogs_active__3SGkw",messages:"Dialogs_messages__3MbI8"}},385:function(e,a,s){e.exports={dialogs:"DialogItem_dialogs__2Y3ZJ",dialogsItems:"DialogItem_dialogsItems__icMuR",active:"DialogItem_active__2-dp1",avatar:"DialogItem_avatar__2AOXY"}},386:function(e,a,s){e.exports={message:"Message_message__1keDf",avatar:"Message_avatar__36lAY",messageContent:"Message_messageContent__nO3cY"}},395:function(e,a,s){"use strict";s.r(a);var t=s(157),n=s(0),i=s.n(n),c=s(384),o=s.n(c),r=s(385),l=s.n(r),d=s(41),g=s(2),j=function(e){return Object(g.jsx)("div",{className:"".concat(l.a.dialog),children:Object(g.jsxs)(d.b,{to:"dialogs/".concat(e.id),children:[Object(g.jsx)("img",{className:l.a.avatar,src:e.avatar,alt:e.name}),e.name]})})},u=s(386),m=s.n(u),b=function(e){return Object(g.jsx)("div",{className:m.a.message,children:Object(g.jsxs)("div",{className:m.a.messageContent,children:[Object(g.jsx)("img",{className:m.a.avatar,src:e.avatar}),Object(g.jsx)("span",{children:e.message})]})})},_=s(185),O=s(186),v=s(79),h=s(105),f=function(e){var a=e.dialogsPage,s=a.dialogs.map((function(e){return Object(g.jsx)(j,{name:e.name,id:e.id,avatar:e.avatar})})),t=a.messages.map((function(e){return Object(g.jsx)(b,{id:e.id,message:e.message,avatar:e.avatar})}));return Object(g.jsxs)("div",{className:o.a.dialogs,children:[Object(g.jsx)("div",{className:o.a.dialogsItems,children:s}),Object(g.jsxs)("div",{className:o.a.messages,children:[Object(g.jsx)("div",{children:t}),Object(g.jsx)(p,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}})]})]})},x=Object(h.a)(50),p=Object(O.a)({form:"DialogsAddMessageForm"})((function(e){return Object(g.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(g.jsx)(_.a,{component:v.b,name:"newMessageBody",placeholder:"Enter your message",validate:[h.b,x]}),Object(g.jsx)("button",{children:"Send"})]})})),D=s(29),I=s(17),M=s(10),A=s(120),N=s(90),k=s(91),w=s(104),y=s(103),S=s(20),C=function(e){return{isAuth:e.auth.isAuth}};a.default=Object(I.d)(Object(D.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(a){e(Object(t.b)(a))}}})),(function(e){var a=function(a){Object(w.a)(t,a);var s=Object(y.a)(t);function t(){return Object(N.a)(this,t),s.apply(this,arguments)}return Object(k.a)(t,[{key:"render",value:function(){var a=this.props,s=(a.isAuth,Object(A.a)(a,["isAuth"]));return this.props.isAuth?Object(g.jsx)(e,Object(M.a)({},s)):Object(g.jsx)(S.a,{to:"/login"})}}]),t}(i.a.Component);return Object(D.b)(C)(a)}))(f)}}]);
//# sourceMappingURL=4.1b84bc09.chunk.js.map