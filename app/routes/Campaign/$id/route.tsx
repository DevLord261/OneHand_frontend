import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import styles from "~/styles/ViewCampaign.module.css";
import { Campaign } from "~/types/campaign";

export async function loader({ params }: LoaderFunctionArgs) {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = params;
  const campaign = await fetch(`${API_URL}/campaign/${id}`);
  const data = await campaign.json();
  if (!campaign.ok) {
    throw new Response("Campaign not found", { status: 404 });
  }
  if (data["id"] != id) {
    throw new Response("unauthorized access", { status: 400 });
  }

  return data as Campaign;
}
export default function ViewCampaign() {
  const campaign = useLoaderData<typeof loader>();
  return (
    <main className={styles.container}>
      <section className={styles.mainimage}>
        <img src="/main.webp" alt="main image" />

        <section>
          <section>{campaign.id}</section>
          <div>Title</div>
          <section>
            <div>Heading 1</div>
            <div>Description</div>
            <div>Heading 2</div>
            <div>Description</div>
            <div>Heading 3</div>
            <div>Description</div>
          </section>
        </section>
      </section>
      <section className={styles.dontaion}></section>
    </main>
  );
}
// Error boundary component
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="error-container">
          <h1>Campaign Not Found</h1>
          <p>The campaign you're looking for doesn't exist.</p>
          <Link to="/campaigns">← Back to Campaigns</Link>
        </div>
      );
    }

    if (error.status === 400) {
      return (
        <div className="error-container">
          <h1>Invalid Campaign ID</h1>
          <p>The campaign ID provided is not valid.</p>
          <Link to="/campaigns">← Back to Campaigns</Link>
        </div>
      );
    }
  }

  return (
    <div className="error-container">
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred.</p>
    </div>
  );
}
