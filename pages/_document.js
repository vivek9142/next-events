/*
Now the _app JS file is not the only special next JS file,
which allows us to set application wide settings.

There also is the _document.JS file, which we can add just like _app
_document JS has to be added in the pages folder directly in the pages folder, not in some 
sub folder, but in the root level of the pages folder.It's not there by default,
but if you add it next JS will take it into account and we'll use it.

But what does documentary JS do? App JS is your application shell.
You can imagine app JS as the root component inside of the body section of your HTML document.
Document JS allows you to customize the entire HTML document. So all the elements that 
make up an HTML document, if you need to do that,you can add to the _document.JS file.

And then you need to add a special component in there,a class-based component, as it turns 
out, which you could name my document, and it has to be a class-based component
because it must extend some component offered and provided by next JS
for this we need to add an import a import of document from next slash document.

So we need to extend document here and therefore we need to use a class based component.
And then in this class based component, we need to add a render method like we do
in class based react components.
*/

import Document, {Html,Head,Main,NextScript} from 'next/document';
/*
Head from next head is important to use it anywhere in your JSX code to adjust the head 
content of the rendered page, head imported from next document should only be used in 
this special document component, which we are building here.
*/


class MyDocument extends Document{
    render(){
        return (
            <Html lang='en'>
                <Head/>
                <body>
                    <div id='overlays'/>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
};

export default MyDocument;

/*
that is the default structure, which you should add. And that's the default structure,
which the default document has if you don't override it.So if you override it,
you wanna recreate that structure and you should also of course export the document
as the default.

Now what could be reasons for overriding that default document?
Well if you want to configure that general document, for example if you wanna add the 
Lang attribute on HTML and set this to en if we don't do this and save everything and 
we reload, we see that there is no Lang attribute on the rendered HTML element.
If we do that, if we add Lang and set this to en or to whichever language applies to 
your page, then if we restart the Dev Server, which we need to do here once,
if we reload the page there after we see the Lang attribute, so I needed to restart 
the server here for this to have an effect,

We could also add other elements here to the body, like for example a div with an 
idea of overlays like that. If we do that and save this, and we reload we see in the 
body there is this div
why might we wanna do that?
Well this allows us to add HTML content outside of our application component tree.
For example for using those elements with react portals then we could select this 
div with a react portal to portal our modals or overlays to this element.

So having extra HTML elements,which are outside of our application components tree
can sometimes be useful because you are next to JS application is in the end rendered 
by this main component, which would therefore must include, but adding extra elements 
can sometimes also be beneficial and therefore If you need to edit the overall HTML document,
you can do this by adding such _document JS file.
*/