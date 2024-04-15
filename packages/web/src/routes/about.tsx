import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="about-container">
      <h1>About ReminderRealm</h1>
      <p>
        Welcome to ReminderRealm, where productivity meets simplicity. Our app
        is designed to streamline your daily tasks and boost your efficiency
        with a user-friendly interface and powerful features. Whether you're
        managing personal errands or coordinating complex projects,
        ReminderRealm is here to help you stay organized and on track.
      </p>

      <h2>Our Mission</h2>
      <p>
        At ReminderRealm, we believe that effective task management should be
        accessible to everyone. That's why we've created an app that not only
        helps you manage your to-dos but also motivates you to complete them.
        Our mission is to help you achieve your goals by transforming your
        productivity and making task management a hassle-free experience.
      </p>
    </div>
  );
}
