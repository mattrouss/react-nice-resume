import React, { Component } from 'react';
import ImageWithSubtext from './ImageWithSubtext';

class PremonitionsArticle extends Component {
  render() {
    return (
      <div>
        <p>
            This was the first time I had ever participated in a Game Jam, in <i>September 2020</i>.
            Despite the lack of sleep, amount of junk food ingested and eye strain,
            the jam was a very fun experience.
        </p>
        <p>
            The project lasted 3 consecutive days, and the team was made up of three programmers,
             a visual artist and a sound designer. And all of our hard work paid off,
             our game <i>Premonitions</i> ended up in <b>2nd place</b> in overall score, out of 127 games!
        </p>
        <h2>
            The Jam
        </h2>
        <p>
            We chose to participate in the <b>Mini Jam</b> game jam, as it lasted over a weekend.
            The event hosted every week invited mostly casual game programmers to participate,
            which was great for me as I had little experience in game development.
        </p>
        <p>
            The game jam had two major constraints: the first one is the overall theme the game had to follow: <b>Future</b>.
            The theme is quite vague so we could have our own take on how the future is involved in our game.
            The second one was picked by the community, and involved using a certain color palette.
            This mostly penalized our graphic designer (sorry Zoé you did a fantastic job).
        </p>
        <h2>
            The Game
        </h2>
        <p>
            The game is entitled <b>Premonitions</b>.
            The basic plot line is that you are the ruler of your kingdom,
            and every day your court presents itself to you one by one (it's a very organized court).
        </p>
        <p>
            However, every night, you have dream where you can partially see a
            member of the court who will try to <b>assassinate</b> you in the morning (hence Premonitions).
            The goal is to correctly determine who the culprit is,
             without accusing too many innocent people and cause a revolution of your people.
        </p>
        <ImageWithSubtext src={"/images/portfolio/premonitions_culprit.png"}
                          alt="premonitions_culprit"
                          subtext="The culprit who is going to get you!"/>
        <p>
            The game was entirely developped using the <i>Unity</i> engine.
            I had a bit of experience with it, but not too much so it was a good opportunity to learn a lot.
            Most of the time spent was searching through the Unity docs, and finding good sound effects on the internet.
        </p>
        <p>
            One of the features I'm particularly proud of is the <i>character generation</i>.
            Since we wanted to have a close to infinite number of characters,
            we couldn't have our graphic designer draw all of them. What we did
            instead is ask her to draw every part of the characters separately such as the face, hat, clothes,...
            Once we had all of these we could stich them up randomly and generate as many characters as we wanted!
            So most of the time we ended up with fun characters such as <i>flower knights</i> and beautiful <i>bearded ladies</i>.
        </p>
        <p>
            I also added probabilistic weights on certain costumes using the Curve Editor
             from Unity to have a bit more control on the characters that can appear.
        </p>
        <ImageWithSubtext src={"/images/portfolio/premonitions_innocent.png"}
                          alt="premonitions_innocent"
                          subtext="Don't accuse innocent bystanders!"/>
        <h2>
            Let's do it again!
        </h2>
        <p>
            Overall we had a great time working on the game for 2 days straight.
            As I said before, this was the first time I participated in a Game Jam
            and produced a full game (may contain improvements to be made).
            I would love trying again some other time, and the Mini Jam organization is great,
            the community very kind and helpful. I would <i>highly</i> recommend. :)
        </p>
        <p>
            The game is available for <b>free</b> on itch.io, so go check it out at the following link:
            <br></br>
            <a className="link" href="https://justcasualcoder.itch.io/premonitions">
                https://justcasualcoder.itch.io/premonitions
            </a>
        </p>
      </div>
    );
  }
}

export default PremonitionsArticle;
