---
categories:
  - Artikel
status: gefunden
source: https://remix.run/
tags:
  - coding
  - web
---
[![](https://remix.run/img/og.1.jpg)](https://remix.run/img/og.1.jpg)

---

![[og.1.jpg]]

## Focused on web standards and modern web app UX, you’re simply going to

Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. People are gonna love using your stuff.

[Get Started](https://remix.run/docs/en/v1/tutorials/blog)[Read the Docs](https://remix.run/docs/en/v1)

```
export async function loader({ request }) {
  return getProjects();
}
export async function action({ request }) {
  const form = await request.formData();
  return createProject({ title: form.get("title") });
}
export default function Projects() {
  const projects = useLoaderData();
  const { state } = useTransition();
  const busy = state === "submitting";
  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug}>{project.title}</Link>
      ))}
      <Form method="post">
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>
    </div>
  );
}
```

## Testimonials

[Jenna Smith](https://twitter.com/jjenzz/status/1459941582912827398), Radix UI

[@jkup](https://twitter.com/jkup/status/1456360115205033989)Cloudflare

[@aweary](https://twitter.com/aweary/status/1456399484473200644)Discord, prev React Core

[@TAbrodi](https://twitter.com/TAbrodi/status/1459531154533634048)

[@sergiodxa](https://twitter.com/sergiodxa/status/1400503400802959361)

[@elrickvm](https://twitter.com/elrickvm/status/1458918740918251524)

[@theflyingcoder1](https://twitter.com/theflyingcoder1/status/1456407168291278851)

[@wisecobbler](https://twitter.com/wisecobbler/status/1388174702900772868)

[@meindertsmajens](https://twitter.com/meindertsmajens/status/1454393707604680711)

[@cammchenry](https://twitter.com/cammchenry/status/1447267585456812039)Web Developer

[@airuyi](https://twitter.com/airuyi/status/1456438853804298244)App Developer

## While you were waiting for your static site to build, distributed web infrastructure got really good. Break through the static.

Remix is a seamless server and browser runtime that provides snappy page loads and instant transitions by leveraging distributed systems and native browser features instead of clunky static builds. Built on the Web Fetch API (instead of Node) **it can run anywhere**. It already runs natively on Cloudflare Workers, and of course supports serverless and traditional Node.js environments, so you can come as you are.

Page speed is only one aspect of our true goal though. We're after **better user experiences**. As you’ve pushed the boundaries of the web, your tools haven’t caught up to your appetite. **Remix is ready** to serve you from the initial request to the fanciest UX your designers can think up. Check it out 👀

## Remix has a cheat code:Nested Routes.

↑↑↓↓←→←→BA

Websites usually have levels of navigation that control child views.

Not only are these components pretty much always coupled to URL segments...

...they’re also the semantic boundary of data loading and code splitting.

Hover or tap the buttons to see how they’re all related

👇

example.com/sales/invoices/102000

Fakebooks

Dashboard

Accounts

Sales

Expenses

Reports

Sales

Overview

Subscriptions

Customers

Deposits

Overdue

$10,800

$62,000

Invoice List

Santa Monica

$10,800

Stankonia

$8,000

Ocean Avenue

$9,500

Tubthumper

$14,000

Wide Open Sp...

$4,600

Stankonia

$8,000

Due Today • Invoiced 10/31/2000

Pro Plan

$6,000

Custom

$2,000

Net Total

$8,000

## What about loading states?

Through nested routes, Remix can eliminate nearly every loading state.

Most web apps fetch inside of components, creating request waterfalls, slower loads, and jank.

Remix loads data in parallel on the server and sends a fully formed HTML document. Way faster, jank free.

Without Remix

about:blank

With Remix

about:blank

(Keep scrolling to compare)

## Pre-fetching Everything

Nested routes allow Remix to make your app as fast as instant.

Remix can prefetch everything in parallel before the user clicks a link.

Public Data. User Data. Modules. Heck, even CSS.

Zero loading states. Zero skeleton UI. Zero jank.

Alright, you caught us, they’re just prefetch link tags, \#useThePlatform

example.com/dashboard

Fakebooks

Dashboard

Accounts

Sales

Expenses

Reports

Dashboard

Recent Activity

Alerts

Messages

New Invoice

Customer

Stankonia

Net Total

$8,000

Customer

Ocean Avenue

Net Total

$9,500

## Data loading

...

You ever notice most of the code in your app is for changing data?

Imagine if React only had props and no way to set state. What’s the point? If a web framework helps you load data but doesn’t help you update it, what’s the point? Remix doesn’t drop you off at the `<form onSubmit>` cliff. (What the heck does `event.preventDefault` do anyway?)

Resilient, progressively enhanced data updates are built in.

It’s so simple it’s kind of silly. Just make a form...

...and an action on a route module. It looks like traditional HTML forms but enables fully dynamic web experiences you're after.

Remix runs the action server side, revalidates data client side, and even handles race conditions from resubmissions.

Get fancy with transition hooks and make some pending UI. Remix handles all the state, you simply ask for it.

Or get jiggy with some optimistic UI. Remix provides the data being sent to the server so you can skip the busy spinners for mutations, too.

HTML forms for mutations. Who knew?

```
export default function NewInvoice() {
  return (
    <Form method="post">
      <input type="text" name="company" />
      <input type="text" name="amount" />
      <button type="submit">Create</button>
    </Form>
  );
}
```

## Error Handling

:)

Your websites run into problems, but with Remix they don’t need to be refreshed. Error handling is hard to remember and hard to do. That’s why it’s built in.

Remix handles errors while Server Rendering. Errors while Client Rendering. Even errors in your server side data handling.

## Route Error Boundaries keep the happy path happy.

Each route module can export an error boundary next to the default route component.

If an error is thrown, client or server side, users see the boundary instead of the default component.

Routes w/o trouble render normally, so users have more options than slamming refresh.

If a route has no boundary, errors bubble up. Just put one at the top and chill out about errors in code review, yeah?

```
export default function InvoiceRoute() {
  const invoice = useLoaderData();
  return <Invoice data={invoice} />;
```

That's probably enough for now. What are you waiting for?