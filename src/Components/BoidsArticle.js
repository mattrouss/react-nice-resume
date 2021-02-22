import React, { Component } from 'react';
import ImageWithSubtext from './ImageWithSubtext';

class BoidsArticle extends Component {
  render() {
    return (
      <div>
        <h2>
            Introduction
        </h2>
        <p>
            This article is about the project I've performed with
            {} <a href="https://github.com/defalur">@defalur</a> for my Advanced OpenGL class in my final year at EPITA.
            The goal of the project was to use advanced features in OpenGL, for instance the <b>compute shader</b>.
            To do so in a rather fun way, we have chosen to simulate schools of fish using the <b>boids</b> simulation technique.
        </p>
        <p>
            Of course we've been highly inspired by Sebastian Lague's video on the subject.
            It's a fantastic watch, feel free to go view it at
            {} <a href="https://www.youtube.com/watch?v=bqtqltqcQhw">https://www.youtube.com/watch?v=bqtqltqcQhw</a>.
        </p>
        <h2>
            What are boids?
        </h2>
        <p>
          Boids are a simulation technique used to mimic the behaviour of groups
          of entities in a natural way, resembling crowds of people, flocks of birds or even schools of fish.
          This method is quite popular as it is very easy to understand and implement,
          and it produces rather convincing results.
        </p>
        <p>
          The group of entities is modelized by a particle system where each particle
          follows a certain set of rules to interact with its neighbours. There
          are only <b>3 rules</b> to follow, and are the following:
        </p>
        <ImageWithSubtext src="/images/portfolio/boids_rules.png"
                          alt="boids_rules"
                          subtext="source: https://shorturl.at/fisxI" 
        />
        <p>
        <i>Alignment:</i> Each boid will align itself with its neighbours' <b>direction</b>.
        </p>
        <p>
        <i>Cohesion:</i> Each boid will go towards the <b>center</b> of its flock.
        </p>
        <p>
        <i>Separation:</i> Each boid will <b>avoid</b> neighbours which are too close to it.
        </p>
        <p>
          We have <b>full control</b> over these rules, and can give more or less weight
          to each one of them, producing different types of behaviour. 
        </p>
        <p>
          To perform a naive implementation of these boids, we can simply compute
          for each boid its acceleration using the 3 rules. Each boid checks in all
          the particles who are its neighbours which make the algorithm's complexity
          <i>O(n^2)</i> (which is quite bad but we will fix this later). The boid's
          neighbours contribute in the change in trajectory, and we can then integrate
          the acceleration twice to get the <b>new position</b> of our boid.
        </p>
        <h2>Boids in OpenGL</h2>
        <p>
          Now that we know what boids are and how to implement them, let's see how to
          draw them in <i>OpenGL</i>. One way to do so is to load a single model
          and pass its transform using a <i>uniform</i> variable, update the uniform
          for each particle, and launch the rendering pipeline for each instance.
        </p>
        <p>
          You can tell right away that this isn't a very efficient way to do this,
          especially because of the constant CPU/GPU communication after every transform
          update. This does <b>not</b> seem to scale well. Good thing there's a technique in
          <i>OpenGL</i> which was <b>specifically</b>
          meant for this which is called <b>instancing</b>.
        </p>
        <h2>
          Instancing
        </h2>
        <p>
          Instancing in <i>OpenGL</i> is a method meant for rendering a large number
          of model instances which share the <b>same vertex data</b> but have
          different object transforms. Basically we are <i>parallelizing</i> the
          previous method which performed <i>N</i> draw calls, into a single call.
        </p>
        <p>
          All we have to do is create a new Buffer Object containing the transform
          information of each particle, and OpenGL will launch <i>N</i> times more
          shader instances for our program (which makes sense because we have <i>N</i>
          more objects) but these shader instances are launched in parallel, which
          is what our GPU is designed to handle.
        </p>
        <p>
          Below you will find the extra data structure for our instance data, as
          well as a few methods for OpenGL to find the correct data for each instance,
          and finally the instanced drawing function.
        </p>
        <ImageWithSubtext src="/images/portfolio/boids_api.png"
                          alt="OpenGL methods for instancing"
                          subtext="OpenGL API for instancing"
        />
        <p>
          Using this method, we can significantly improve the <b>performance</b>
          {} of our program, and render more than <b>one million</b> particle in real time!
        </p>
        <ImageWithSubtext src="/images/portfolio/monke_army.png"
                          alt="Monke army"
                          subtext="An army of Suzannes in real time!"
        />
        <h2>Making this go faster</h2>
        <p>
          As we've said earlier, finding naively each boid's neighbors to compute
          the new direction is <b>not very efficient</b>.
          An possible optimization is to use a <b>neighborhood grid</b> to limit the neighbor search.
        </p>
        <p>
          The general <i>idea</i> is to maintain a <b>3D grid</b> where each boid is placed
          in every slot of the grid. At each frame, the grid is sorted using the method
          developed in the paper <i>Joselli, M., Passos, E. B., Zamith, M., Clua, E., Montenegro, A., & Feijó, B. (2009, October). A neighborhood grid data structure for massive 3d crowd simulation on gpu. In 2009 VIII Brazilian Symposium on Games and Digital Entertainment (pp. 121-131). IEEE.</i>
          <br></br> This process is described below:
        </p>
        <ImageWithSubtext src="/images/portfolio/boids_grid.png"
                          alt="Neighborhood"
                          subtext="Swapping the neighborhood grid"
        />
        <p>
            The idea is to perform a series of <i>swaps</i> of our boids if they are not in the correct slot.
            The grid is sorted along <b>columns</b>, first all even columns and then odd columns, the same is done for all <b>lines</b>
            {} and also for the <b>"up"</b> direction (because this is a 3D grid).
        </p>
        <p>
          This grid does not perform a <b>total</b> sort of the grid (the grid is not completely sorted at all times)
          but we are making an <i>approximation</i> here, and it gives good results.
        </p>
        <h2>The program</h2>
        <p>
          We now have all the pieces of our algorithm in place, let's throw a couple
          of steps in the compute shader and see how it looks!
        </p>
        <ImageWithSubtext src="/images/portfolio/boids_pipeline.png"
                          alt="Program pipeline"
                          subtext="Boids program execution pipeline"
        />
        <p>
          The instance data is first used as a SSBO in the sorting and boid update
          phases, and after that the data is fed to the <i>display</i> program,
          which is great because we limit dataflow between CPU and GPU. It's
          worth mentioning to beware of structure padding in the SSBO, I lost more
          than a few hours trying to figure out why I wasn't <i>accessing my data correctly</i>.
        </p>
        <h2>
          A few examples
        </h2>
        <p>
          Here are a few screenshots of our program, we've added a few things such as a skybox
          to have a nice background, a low poly mesh of a fish and different colors
          representing different flocks of fish. We've also made a short <a href="https://youtu.be/YhohLO3mtpg">video</a>
          {} displaying our program in better detail.
        </p>
        <ImageWithSubtext src="/images/portfolio/boids_model.png"
                          alt="Fish model"
                          subtext="Model used for our boid fish"
        />
        <ImageWithSubtext src="/images/portfolio/boids_fewfish.png"
                          alt="Fish render"
                          subtext="Small number of fish"
        />
        <ImageWithSubtext src="/images/portfolio/boids_beegfish.png"
                          alt="Many fish render"
                          subtext="That's a lot of fish! And we're still real time :)"
        />
        <h2>
          Performance and improvements
        </h2>

        <ImageWithSubtext src="/images/portfolio/boids_performance.png"
                          alt="graph"
                          subtext="Performance of our program on CPU: AMD Ryzen 7 3700X, GPU: NVIDIA GeForce GTX 1080
                          "
        />
        <p>
          We can finally see the results of our hard work! We are able to render
          the simulation in real time with up to <b>100 000</b> boids! After that
          we gradually reduce in performance, and by the time we get to 1 000 000 boids
          we only have about <i>4 FPS</i> left. But to be fair one million boids is
          {} <b>A LOT</b> of boids.
        </p>
        <p>
            There are a few things that we can improve in our program such as boid
            interaction with an environment; we did not take time to build an environment
            for our fish, they currently live in the <i>void</i>. The fish have not been
            {} <b>animated</b>, to have them act more naturally we have added a small random
            vector to their direction, but a real animation would be much better.
        </p>
        <p>
            In terms of performance, there is <b>always</b> room for improvement,
            which could be the subject of another project. But we are quite satisfied
            with what we have produced as of today!
        </p>
        <h2>
          The project overall
        </h2>
        <p>
            I had a great time developing this project, and I am very <b>proud</b>
            {} of the way it turned out. These visual projects are quite fullfilling
            at the end of the day, and I was able to experiment a few advanced techniques
            in <i>OpenGL</i>.
        </p>
        <p>
            If you would like to check the source of this project, you can check it out <a href="https://github.com/mattrouss/pogla">here</a>.
            I've made a technical presentation of the project as well over <a href="https://youtu.be/jINmc8THhEo">here</a>
            {} (however I hope you've studied your French).
        </p>
      </div>
    );
  }
}

export default BoidsArticle;

