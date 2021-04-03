import { Route, Switch, Redirect } from "react-router-dom";

import Chat from "./chat/Chat";
import { LoginForm } from "./auth/Login";
import { Signup } from "./auth/Signup";
import Room from "./room/Room";
import VideoRoom from "./groupVideoRoom/VideoRoom";

export function MyRoutes({ state, updateState }) {
  return (
    <Switch>
      {!state.token && <Redirect from="/chat" to="/" exact />}
      {state.token && <Redirect from="/" to="/chat" exact />}

      {state.token ? (
        <>
          <Route
            path="/chat"
            exact
            render={(props) => (
              <Chat
                {...props}
                username={state.user?.email}
                userId={state.user?.id}
                updateState={updateState}
                chats={state.chats}
              />
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
              <Chat
                {...props}
                username={state.user?.email}
                userId={state.user?.id}
                updateState={updateState}
                chats={state.chats}
              />
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
