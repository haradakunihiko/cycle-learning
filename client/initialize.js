
// import './styles/graphiql.css'
// import './lib/inspinia/css/bootstrap.css'
// import './lib/inspinia/css/style.css'
// import './lib/inspinia/css/animate.css'
// import 'lib/inspinia/css/plugins/iCheck/custom.css'
// import 'lib/inspinia/css/plugins/switchery/switchery.css'

// import './styles/application.css';

// import 'lib/inspinia/js/plugins/metisMenu/jquery.metisMenu';
// import 'lib/inspinia/js/plugins/slimscroll/jquery.slimscroll.min';
// import 'lib/inspinia/js/plugins/sparkline/jquery.sparkline.min'
// import 'icheck/icheck'

// import 'lib/inspinia/js/plugins/d3/d3.min'

import React from 'react';
import ReactDOM from 'react-dom';
// import { applyRouterMiddleware, Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
// import useRelay from 'react-router-relay';
// import Relay from 'react-relay';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {deepOrange500} from 'material-ui/styles/colors';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// import Auth from './app/Auth';
// import Root from './app/Root';
import Home from './app/Home';

// import LogInPage from './app/LogInPage';
// import SignUpPage from './app/SignUpPage';

// import BookShelfPage from './app/BookShelfPage';
// import QuizTrainingPage from './app/QuizTrainingPage';
// import QuizPage from './app/QuizPage';

// import GraphqlEditor from './app/GraphqlEditor';

// import ViewerQueries from 'route/ViewerQueries';
// import NodeQueries from 'route/NodeQueries';


// injectTapEventPlugin();

// const muiTheme = getMuiTheme({
//   palette: {
//     accent1Color: deepOrange500,
//   },
// });

// Relay.injectNetworkLayer(
//   new Relay.DefaultNetworkLayer('/graphql', {
//     credentials: 'same-origin',
//   })
// );

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />
  , document.getElementById('app'));
});

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Router
//       history={browserHistory}
//       render={applyRouterMiddleware(useRelay)}
//       environment={Relay.Store}
//     >
//       <Route component={Auth} queries={ViewerQueries}>
//         <Route path="/" component={Root} queries={ViewerQueries} requireAuth={true}>
//           <IndexRoute component={Home} />
//           <Route path="training" component={BookShelfPage} queries={ViewerQueries} />
//           <Route path="training/:node" component={QuizTrainingPage} queries={NodeQueries} />
//           <Route path="training/session/:node" component={QuizPage} queries={NodeQueries} requireAuth={true} />
//         </Route>
//       </Route>

//       <Route path="/login" component={LogInPage} queries={ViewerQueries}/>
//       <Route path="/signup" component={SignUpPage} queries={ViewerQueries}/>
//       <Route path="/graphqleditor" component={GraphqlEditor}/>
//     </Router>
//   , document.getElementById('app'));
// });

// react-relay-routerを使わないとlocationが取得できない？
// RelayRootContainerってなに？つかうの？
// required_childrenってなに？
// login前後で同じidのviewerを持つことで、ログイン後に更新されるようにする
// cacheDirをすると、Relay.QLのエラーが古いまま残ってしまうため、webpack設定は注意
// isoformic-fetchでは、same-originを渡さないといけない
// mutation のoptimisticResponse。idを含めるのを忘れないように。取得時に明示的にとっていなくても、__dataID__という形で保持している。
// また、レスポンセにはidは常に入っている。これを忘れると、optimisticResponseにidが含まない形になってしまう。responseを忠実に再現する必要はないが、
// idは常に必要

//TODO 
// sessionにbookを持たせる
// icheckの使い方チェック。hoverでpreview できるように！