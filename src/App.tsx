import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Layout } from "./components/Layout/Layout";
import { AttendanceGrid } from "./components/AttendanceGrid/AttendanceGrid";
import { CurrentSchedule } from "./components/CurrentSchedule/CurrentSchedule";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AttendanceGrid />
            <CurrentSchedule />
          </div>
        </Layout>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
