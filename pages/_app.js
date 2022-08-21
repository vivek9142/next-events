import Layout from '../components/layout/layout'
import Head from 'next/head'

import '../styles/globals.css'
import { NotificationContextProvider } from '../store/notification-context'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
        <Layout>
        <Head>
            <title>Next Events</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta name="description" content="Find all Events" key="description"/>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp



/* 
---------Working with the "_app.js" File -------------

we also might have certain Head settings that should be the same across all page components.
So we don't wanna copy and paste it into every single page component.
Now we could solve this by outsourcing it into a separate file, into a separate component
and then importing that into all the page components and using it there, but we can also 
use another approach.

Next, JS has this _app.js file and it also has another file which we'll be able to utilize.
Now, let's understand what the idea behind those files is The _app.js file is your route 
app component which in the end is rendered for every page that is being displayed.

MyApp, this component here is rendered by Next.js and will render  every component
this component prop will automatically be set by Next to JS so you don't need to do 
anything for that.But then you can utilize this _app.js file
such that as we're currently doing it, you wrap your page content with our components.
Like here, I'm wrapping the Layout component around the page component to give 
all pages the same layout so the same navigation bar, for example.

So that actually is a file which we are already utilizing.And of course, therefore we could 
also import Head here from next/head imported into this app.js file and then add Head here 
to set some generic setting that applies to all our page components.

-----Merging "head" Content---------

NextJS automatically merges multiple <Head> elements. So if you set a <Head> here in _appJS,
and then also in the page component, the content of those different <Head> sections gets merged.
Even if we would have multiple <Head> sections here inside of a single component,
the content would be merged by NextJS.

But of course that means that we could also have conflicts.
For example, I could have a another <title> set here for whatever reasons, and now 
I set a <title> here and here. Now NextJS automatically merges your <Head> sections,
and it also resolves such conflicts.It simply takes the latest element,
if you have to same element multiple times. So if we have the <title> here and here,
the second <title> wins.

but let's say a meta element with some other attributes, then you can always add a manual 
key here, like description to still allow NextJS to find out if two elements are clashing.
And then, again, the latter one will win.
*/