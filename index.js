*
{
    font-family: NatGeoFont;
}

html
{
    background-color: #002B36;
}

body
{
    margin: 0px;
}

@font-face {
    font-family: NatGeoFont;
    src: url('Fonts/Pigiarniq.ttf');
}

#hamIcon
{
    display: none;
    position: fixed;
    top: 0px;
    z-index: 99;
    background-color: #3abefb;
    color: rgb(0, 0, 0);
    font-size: 30px;
    width: 45px;
    height: 45px;
}

#navBar
{
    display: grid;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 12%;
    margin: 0px;
    padding: 0px;
    background-color: #026773;
    align-items: center;
    z-index: 100;
    grid-template-columns: repeat(5, 1fr);
    transition: transform 0.5s ease-in-out;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

#navSpacer
{
    position: relative;
    width: 100%;
    height: 12vh;
    margin: 0px;
    padding: 0px;
}

.button
{
    background-color: #3abefb;
    border-radius: 6px;
    width: 100%;
    min-height: 6vh;
    height: min-content;
    font-size: 16px;
    font-family: NatGeoFont;
    transition: background-color 0.3s ease;
    transition: transform 0.3s ease-in-out;
}

.button:hover
{
    background-color: #f4a300;
    transform: scale(1.05);
}

#closeIcon
{
    background-color: #fb3a3a;
    border-radius: 6px;
    width: 100%;
    min-height: 6vh;
    height: min-content;
    font-size: 16px;
    font-family: NatGeoFont;
    transition: background-color 0.3s ease;
    transition: transform 0.3s ease-in-out;
    display: none;
}

#closeIcon:hover
{
    background-color: #f4a300;
    transform: scale(1.05);
}

main
{
    margin: 0px;
    padding: 0px;
}

nav ul li
{
    display: inline;
}

/*Home Page*/
#page1
{
    margin: 0px;
    padding: 0px;
}

.slideContainer
{
    position: relative;
    background-color: #026773;
    height: 88vh;
    z-index: 10;
}

.slideContainer::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(
    ellipse,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.5) 90%,
    rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 9;
}

.slide
{
    aspect-ratio: 16 / 9;
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
    filter: brightness(80%);
    z-index: 0;
}

.showSlide
{
    opacity: 1;
    display: block;
}

.title
{
    margin: 0px;
    color: white;
    font-size: 4vw;
    font-family: NatGeoFont;
    text-shadow: rgb(66, 66, 66) 5px 3px;
    font-size: calc(3vh + 3vw);
}

#homePageTitle
{
    position: absolute;
    translate: 15vw 35vh;
    z-index: 15;
}

#homepageSpacer
{
    display: block;
    height: 100vh;
    z-index: 0;
}

#QRDescription
{
    text-shadow: none;
    color: white;
    text-align: center;
}

.centeredBox
{
    box-sizing: border-box;
    padding: 4%;
    align-self: center;
    max-width: 100%;
    height: auto;
}

.flexBoxDown
{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 4%;
    gap: 20px;
    justify-content: space-evenly;
    align-content: space-around;
}

.flexBoxRight
{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    gap: 1.25rem;
    justify-content: space-evenly;
    align-content: space-around;
}

.flexBoxLeft
{
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;
    gap: 20px;
    justify-content: space-evenly;
    align-content: space-around;
}

#page1 .textFlexBox
{
    border-radius: 18px;
    background-color: #ffaa00;
    border: 3px solid #785000;
    box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.25);
    padding: 4%;
    max-width: 50%;
}

#page1 .imageFlexBox
{
    border: 3px solid #785000;
    box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease-in-out;
    max-width: 50%;
    height: auto;
    object-fit: cover;
}

#page1 .imageFlexBox:hover
{
    cursor: pointer;
    background-color: #f4a300;
    transform: scale(1.05);
}

.description
{
    font-family: 'Courier New', Courier, monospace;
    color: white;
    padding-left: 4%;
    padding-right: 4%;
}

h2
{
    font-size: calc(2vh + 1vw);
}

h3
{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: calc(2vh + 2vw);
    font-style: italic;
    text-shadow: rgb(209, 115, 0) 2px 2px;
}

p
{
    font-size: calc(1vh + 1vw);
}

/*Page 2*/

#page2 h3
{
    font-family: 'Times New Roman', Times, serif;
    color: rgb(255, 196, 0);
    text-shadow: #000000 3px 2px;
    text-align: center;
}

#page2 p
{
    padding-left: 4%;
    padding-right: 4%;
    color: white;
    text-shadow: #000000 3px 2px;
    font-size: calc(1.4vh + 0.95vw);
}

#page2 .flexBoxDown
{
    padding: 0px;
    gap: 0px;
}

#page2 .flexBoxRight
{
    gap: 0px;
    height: 88vh;
}

#page2 .flexBoxLeft
{
    gap: 0px;
    height: 88vh;
}

#page2 .flexBoxRight .textFlexBox
{
    border-radius: 0px;
    padding: 0px;
    width: 100%;
    box-shadow: 8px 0px 8px -4px rgba(0, 0, 0, 0.5);
    z-index: 1;
}

#page2 .flexBoxLeft .textFlexBox
{
    border-radius: 0px;
    padding: 0px;
    width: 100%;
    box-shadow: -8px 0px 8px -4px rgba(0, 0, 0, 0.5);
    z-index: 1;
}

#page2 .imageFlexBox
{
    transition: transform 0.3s ease-in-out, translate 0.3s ease-in-out;
    min-width: 50%;
    max-width: 50%;
    height: 100%;
    object-fit: cover;
}

.openImage
{
    transform: scale(1.05);
    translate: -50% -8%;
    z-index: 101;
    object-fit: contain;
}

/*Page 3*/

#page3 h3
{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 2vw;
    font-style: italic;
    text-shadow: rgb(209, 115, 0) 2px 2px;
    padding: 0px;
}

.flexBoxRight
{
    perspective: 1000px;
}

#page3 p
{
    font-size: 1vw;
}

.flipCard
{
    position: relative;
    background-color: transparent;
    width: 27vw;
    height: 27vw;
    transition: transform 0.8s ease-in-out;
    transform-style: preserve-3d;
}

.cardOuter
{
    position: relative;
    transition: transform 0.3s ease-in-out;
    transform-style: preserve-3d;
}

.cardOuter:hover
{
    transform: scale(1.05);
}

/* Image */
.flipCardFront
{
    position: absolute;
    border-radius: 18px;
    background-color: #ffaa00;
    border: 3px solid #785000;
    width: 100%;
    height: 100%;
    text-align: center;
    backface-visibility: hidden;
    object-fit: cover;
    cursor: pointer;
}

/* Text */
.flipCardBack
{
    position: absolute;
    border-radius: 18px;
    background-color: #ffaa00;
    border: 3px solid #785000;
    box-sizing: border-box;
    padding: 4%;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    cursor: pointer;
}

/*Page 4*/
#page4 .flexBoxDown
{
    gap: calc(4vh + 4vw);
}

#page4 .textFlexBox
{
    border-radius: 18px;
    background-color: #ffaa00;
    border: 3px solid #785000;
    box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.25);
    padding: 4%;
    max-width: 50%;
}

#page4 .imageFlexBox
{
    border: 3px solid #785000;
    box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease-in-out;
    max-width: 50vw;
    height: auto;
    object-fit: cover;
}

#page4 .imageFlexBox
{
    border: 3px solid #785000;
    box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 85%;
    object-fit: cover;
}

p .description
{
    font-family: 'Courier New', Courier, monospace;
    font-size: calc(1vh + 1vw);
}

iframe
{
    min-width: 90%;
    aspect-ratio: 16 / 9;
    height: auto;
}

.textBox
{
    border-radius: 18px;
    background-color: #ffaa00;
    border: 3px solid #785000;
    box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.25);
    padding: 4%;
}

/*Pet Simulator*/
#gameBackgroundImage
{
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    user-select: none;
}

#gameTitle
{
    box-sizing: border-box;
    position: absolute;
    background-color: #00c60d;
    color: rgb(0, 69, 0);
    border: 3px solid rgb(0, 88, 21);
    min-height: 45px;
    z-index: 10;
    height: min-content;
    margin: 0px;
    justify-self: center;
    align-content: center;
    font-size: calc(1vh + 1vw);
}

#page5
{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 88vh;
    background-color: #eef;
}

#moneyDisplay
{
    box-sizing: border-box;
    position: absolute;
    align-content: center;
    margin: 0px;
    background-color: gold;
    color: green;
    font-size: calc(1vw + 1.5vh);
    padding: 0.25vw;
    border: 3px solid rgb(255, 166, 0);
    z-index: 2;
    min-height: 45px;
    font-family: monospace;
    font-weight: bold;
}

#buyMenuButton
{
    position: absolute;
    width: 15vw;
    height: 4vh;
    top: 0px;
    right: 0px;
    font-size: 2vw;
    object-fit: cover;
    font-size: calc(1vw + 1vh);
    z-index: 2;
}

#buyMenu
{
    position: absolute;
    background-color: rgba(128, 128, 128, 0.65);
    top: 10%;
    width: 100%;
    height: 40vh;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: -10;
}

.pet {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 90px;
    cursor: pointer;
    transition: left 5s, top 5s;
}

.petName {
    position: absolute;
    top: -30px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    width: 100px;
    height: 50px;
    text-align: center;
    justify-self: center;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: large;
    z-index: 1;
}

.petImg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
}

.moneyClick
{
    position: absolute;
    color: rgb(58, 255, 58);
    width: 100px;
    height: 50px;
    text-align: center;
    justify-self: center;
    transition: all 1s ease-in-out;
    user-select: none;
}

@media screen and (max-width: 800px)
{
    /*make menu items vertical*/
    nav ul li
    {
        display: block;
    }
    
    /* unhide menu icon */
    #hamIcon
    {
        display: block;
    }

    #closeIcon
    {
        display: block;
    }

    nav ul
    {
        display: none;
    }

    .button
    {
        font-size: 20px;
    }

    #hamIcon
    {
        display: block;
        justify-content: center; /* centers horizontally */
        align-items: center;     /* centers vertically */
    }

    .slideContainer
    {
        height: 60vh;
    }

    .slideContainer::after {
        height: 60vh;
    }

    #homepageSpacer
    {
        height: 60vh;
    }

    #navSpacer
    {
        height: 0px;
    }

    #navBar
    {
        height: fit-content;
        padding-top: 8px;
        padding-bottom: 8px;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 5px;
    }

    .flexBoxRight
    {
        flex-direction: column;
    }

    .flexBoxLeft
    {
        flex-direction: column;
    }

    #page1 .textFlexBox, #page1 .imageFlexBox, #page4 .textFlexBox, #page4 .imageFlexBox
    {
        max-width: 100%;
    }

    #page2 .flexBoxRight, #page2 .flexBoxLeft
    {
        height: fit-content;
    }

    #page2 .flexBoxRight .textFlexBox,#page2 .flexBoxLeft .textFlexBox
    {
        box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.5);
    }

    #page2 .imageFlexBox
    {
        transition: all 0.3s ease-in-out;
        max-width: none;
        height: 100%;
    }

    #page3 .flexBoxRight
    {
        flex-direction: row;
        overflow-wrap: normal;
    }

    #page3 p
    {
        font-size: calc(1vw + 0.2vh);
    }

    #page4 .flexBoxRight, #page4 .flexBoxLeft
    {
        flex-direction: column;
    }

    #page5
    {
        height: 100vh;
    }

    #moneyDisplay
    {
        left: 45px;
    }

    #websiteQR
    {
        display: none;
    }
}
