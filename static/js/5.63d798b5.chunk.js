(this.webpackJsonpuntitled=this.webpackJsonpuntitled||[]).push([[5],{232:function(t,e,s){t.exports={formControl:"FormControls_formControl__2DK8S",error:"FormControls_error__sGwtC",formSummaryError:"FormControls_formSummaryError__1n2jB"}},233:function(t,e,s){"use strict";s.d(e,"b",(function(){return u})),s.d(e,"a",(function(){return j}));var n=s(3),r=s(237),c=(s(0),s(232)),i=s.n(c),o=s(1),a=function(t){t.input;var e=t.meta,s=(t.child,Object(r.a)(t,["input","meta","child"])),n=e.touched&&e.error;return Object(o.jsxs)("div",{className:i.a.formControl+" "+(n?i.a.error:""),children:[Object(o.jsx)("div",{children:s.children}),n&&Object(o.jsx)("span",{children:e.error})]})},u=function(t){var e=t.input,s=(t.meta,t.child,Object(r.a)(t,["input","meta","child"]));return Object(o.jsx)(a,Object(n.a)(Object(n.a)({},t),{},{children:Object(o.jsx)("textarea",Object(n.a)(Object(n.a)({},e),s))}))},j=function(t){var e=t.input,s=(t.meta,t.child,Object(r.a)(t,["input","meta","child"]));return Object(o.jsx)(a,Object(n.a)(Object(n.a)({},t),{},{children:Object(o.jsx)("input",Object(n.a)(Object(n.a)({},e),s))}))}},234:function(t,e,s){"use strict";s.d(e,"b",(function(){return n})),s.d(e,"a",(function(){return r}));var n=function(t){if(!t)return"Field is required"},r=function(t){return function(e){if(e&&e.length>t)return"Max length is ".concat(t," symbols")}}},301:function(t,e,s){t.exports={descriptionBlock:"ProfileInfo_descriptionBlock__2HLL7",contact:"ProfileInfo_contact__2kVKb"}},302:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__bD3bY",posts:"MyPosts_posts__tuMtb"}},303:function(t,e,s){t.exports={item:"Post_item__14a2C"}},306:function(t,e,s){"use strict";s.r(e);var n=s(3),r=s(28),c=s(29),i=s(31),o=s(30),a=s(0),u=s.n(a),j=s(65),l=s(301),b=s.n(l),d=s(36),p=s(1),O=function(t){var e=Object(a.useState)(!1),s=Object(j.a)(e,2),n=s[0],r=s[1],c=Object(a.useState)(t.status),i=Object(j.a)(c,2),o=i[0],u=i[1];Object(a.useEffect)((function(){u(t.status)}),[t.status]);return Object(p.jsxs)(p.Fragment,{children:[!n&&Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Status: "})," ",Object(p.jsx)("span",{onDoubleClick:function(){r(!0)},children:Object(p.jsx)("b",{children:t.status||"----"})})]}),n&&Object(p.jsx)("div",{children:Object(p.jsx)("input",{onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),t.updateStatus(o)},type:"text",value:o})})]})},f=s(75),h=function(t){return Object(p.jsxs)("form",{onSubmit:t.onSubmit,children:[Object(p.jsxs)("div",{children:[" ",Object(p.jsx)("button",{onClick:function(){},children:"Save"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name: "})," ",Object(p.jsx)("input",{type:"text"})]}),Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job"})," : ",Object(p.jsx)("input",{type:"checkbox"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:" My professional skills "})," ",Object(p.jsx)("input",{type:"text"})]}),Object(p.jsx)("span",{children:t.profile.aboutMe})]})]})},x=function(t){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(O,{status:t.status,updateStatus:t.updateStatus}),t.isOwner&&Object(p.jsx)("div",{children:Object(p.jsx)("button",{onClick:t.goToEditMode,children:"Edit"})}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name: "}),t.profile.fullName]}),Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job"})," : ",t.profile.lookingForAJob?"yes":"no"]}),t.profile.lookingForAJob&&Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:" My professional skills "}),t.profile.lookingForAJobDescription]}),Object(p.jsx)("span",{children:t.profile.aboutMe}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts: "})," ",Object.keys(t.profile.contacts).map((function(e){return Object(p.jsx)(m,{contactTitle:e,contactValue:t.profile.contacts[e]},e)}))]})]})]})},m=function(t){var e=t.contactTitle,s=t.contactValue;return Object(p.jsxs)("div",{className:b.a.contact,children:[Object(p.jsxs)("b",{children:[e,": "]})," ",s]})},v=function(t){var e=Object(a.useState)(!1),s=Object(j.a)(e,2),n=s[0],r=s[1];if(!t.profile)return Object(p.jsx)(d.a,{});return Object(p.jsx)("div",{children:Object(p.jsxs)("div",{className:b.a.descriptionBlock,children:[Object(p.jsx)("img",{src:t.profile.photos.large||f.a}),t.isOwner&&Object(p.jsx)("input",{type:"file",onChange:function(e){null!==e.target.files&&t.savePhoto(e.target.files[0])}}),n?Object(p.jsx)(h,{onSubmit:function(t){console.log(t)},profile:t.profile}):Object(p.jsx)(x,{profile:t.profile,status:t.status,updateStatus:t.updateStatus,isOwner:t.isOwner,goToEditMode:function(){r(!0)}})]})})},g=s(60),k=s(302),S=s.n(k),y=s(303),P=s.n(y),_=function(t){return Object(p.jsxs)("div",{className:P.a.item,children:[Object(p.jsx)("img",{src:t.image}),t.message,Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"like"})," ",t.likesCount]})]})},C=s(110),F=s(111),w=s(234),M=s(233),B=u.a.memo((function(t){var e=t.posts.map((function(t){return Object(p.jsx)(_,{message:t.message,likesCount:t.likesCount,image:t.image})}));return Object(p.jsxs)("div",{className:S.a.postsBlock,children:[Object(p.jsx)("h3",{children:"My posts"}),Object(p.jsx)("div",{children:Object(p.jsx)(E,{onSubmit:function(e){t.addPost(e.newPostBody)}})}),Object(p.jsx)("div",{className:S.a.posts,children:e})]})})),I=Object(w.a)(10),E=Object(F.a)({form:"PostForm"})((function(t){return Object(p.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(p.jsx)(C.a,{component:M.b,name:"newPostBody",placeholder:"Enter your message",validate:[w.b,I]}),Object(p.jsx)("button",{children:"Add post"})]})})),N=s(22),A=Object(N.b)((function(t){return{posts:t.profilePage.posts}}),(function(t){return{addPost:function(e){t(Object(g.a)(e))}}}))(B),D=function(t){return Object(p.jsxs)("div",{children:[Object(p.jsx)(v,{isOwner:t.isOwner,profile:t.profile,status:t.status,updateStatus:t.updateStatus,savePhoto:t.savePhoto}),Object(p.jsx)(A,{})]})},J=s(7),T=s(20),U=function(t){Object(i.a)(s,t);var e=Object(o.a)(s);function s(){return Object(r.a)(this,s),e.apply(this,arguments)}return Object(c.a)(s,[{key:"refreshProfile",value:function(){var t=this.props.match.params.userId;t||(t=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUserProfile(t),this.props.getStatus(t)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t){this.props.match.params.userId!==t.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(p.jsx)(D,Object(n.a)(Object(n.a)({},this.props),{},{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),s}(u.a.Component);e.default=Object(T.d)(Object(N.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:g.d,getStatus:g.c,updateStatus:g.f,savePhoto:g.e}),J.f)(U)}}]);
//# sourceMappingURL=5.63d798b5.chunk.js.map