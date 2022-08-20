import Image from 'next/image'

import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './event-item.module.css';

function EventItem(props){
    const {title,image,date,location,id} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US',{
        day:'numeric',
        month:'long',
        year: 'numeric'
    });

    const formattedAddress = location.replace(', ','\n');
    const exploreLink = `/events/${id}`;
    return(
        <li className={classes.item}>
            <Image src={`/${image}`} alt={title} width={250} height={160} />
            <div className={classes.content}> 
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem;

/*
currently we're using the standard image tag, the standard image element,
but for optimizing images we can import a component offered by Next.js,

the image component from next/image. Now, this is a special component which we can use
to replace the standard image element. And when we use that special component,
Next.js will create multiple versions of our image on the fly when requests are coming in,
optimize for the operating systems and device sizes that are making the request.
And then those generated images will be cached for future requests from similar devices.

But now we also need to add two more attributes,two more props here.
And that's the width and the height attributes. We need to set those to basically 
inform Next.js about the width and height of this image.

And with that, I don't mean the original width and height of the image,
but the width and height which we need for the image here. For determining the width and 
height, we should keep in mind that our image is displayed in two possible ways.
It either takes the full width of the container on smaller screens or just a fraction 
of the width on bigger screen sizes.

hese are the optimized images, which are generated when they're needed.
So they're not generated in advance, but when a request reaches the page.
But then they are stored so did future requests from a similar devices
immediately get that already generated image.

You still override width and height,as you set it here with your CSS styles.
So if you give the image a hard-coded width and height, those CSS styles still kick in.
The width and height, you set here only determine the image size that will be fetched 
in the end. The final styling is still being done with CSS.
*/