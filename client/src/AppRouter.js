import { Route, Switch, Redirect } from "react-router-dom";

// import Chat from "./components/chat/Chat";
import { Chat } from "./components/chat/Chat";
import { LoginForm } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import Room from "./components/room/Room";
import VideoRoom from "./components/groupVideoRoom/VideoRoom";
// import { navHeight } from "./components/navbar/NavbarElements";

export function AppRouter({ state, updateState }) {
  return (
    <Switch>
      {!state.token && <Redirect from="/chat" to="/" exact />}
      {state.token && <Redirect from="/signup" to="/" exact />}
      {state.token && <Redirect from="/" to="/chat" exact />}

      {state.token ? (
        <>
          {/* <div style={{ height: navHeight }}></div> */}
          <Route
            path="/chat"
            exact
            render={(props) => (
              <Chat {...props} updateState={updateState} state={state} />
            )}
          />
          <Route
            path="/group"
            exact
            render={(props) => (
              <VideoRoom
                {...props}
                userId={state.user?.id}
                user={state.user}
                updateState={updateState}
              />
            )}
          />
          <Route
            path="/group/:roomId"
            exact
            render={(props) => (
              <VideoRoom
                {...props}
                userId={state.user?.id}
                user={state.user}
                updateState={updateState}
              />
            )}
          />
          <Route
            path="/room"
            exact
            render={(props) => (
              <Room
                {...props}
                userId={state.user?.id}
                user={state.user}
                updateState={updateState}
              />
            )}
          />

          <Route
            path="/chat/:id"
            exact
            render={(props) => (
              <Chat {...props} updateState={updateState} state={state} />
            )}
          />

          <Route
            path="/room/:id"
            exact
            render={(props) => (
              <Room
                {...props}
                user={state.user}
                userId={state.user?.id}
                updateState={updateState}
              />
            )}
          />
        </>
      ) : (
        <>
          <Route path="/" exact render={(props) => <LoginForm {...props} />} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} updateState={updateState} />}
          />
        </>
      )}
    </Switch>
  );
}
