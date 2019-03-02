import React, { Component } from 'react';
import { homedir } from 'os';
import '../css/home.css'

class Home extends Component {
    constructor(props)
    {
        super(props);
    }
    

    render()
    {
        return(
    <div>
        <head>
            <meta charset="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
            <meta name="description" content=""></meta>
            <meta name="author" content=""></meta>

            <title>One Page Wonder - Start Bootstrap Template</title>

            <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></link>

            <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" rel="stylesheet"></link>

            <link href="css/one-page-wonder.min.css" rel="stylesheet"></link>

        </head>

            <body>

            <header class="masthead text-center text-white">
                <div class="masthead-content">
                <div class="container">
                    <h1 class="masthead-heading mb-0">One Page Wonder</h1>
                    <h2 class="masthead-subheading mb-0">Will Rock Your Socks Off</h2>
                    <a href="#" class="btn btn-primary btn-xl rounded-pill mt-5">Learn More</a>
                </div>
                </div>
                <div class="bg-circle-1 bg-circle"></div>
                <div class="bg-circle-2 bg-circle"></div>
                <div class="bg-circle-3 bg-circle"></div>
                <div class="bg-circle-4 bg-circle"></div>
            </header>

            <section>
                <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 order-lg-2">
                    <div class="p-5">
                        <img class="img-fluid rounded-circle" src="img/01.jpg" alt=""></img>
                    </div>
                    </div>
                    <div class="col-lg-6 order-lg-1">
                    <div class="p-5">
                        <h2 class="display-4">Filler to talk about Jobs...</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <section>
                <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                    <div class="p-5">
                        <img class="img-fluid rounded-circle" src="img/02.jpg" alt=""></img>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="p-5">
                        <h2 class="display-4">Filler to talk about QoL...</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <section>
                <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 order-lg-2">
                    <div class="p-5">
                        <img class="img-fluid rounded-circle" src="img/03.jpg" alt=""></img>
                    </div>
                    </div>
                    <div class="col-lg-6 order-lg-1">
                    <div class="p-5">
                        <h2 class="display-4">Filler to talk about Transportation...</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <footer class="py-5 bg-black">
                <div class="container">
                <p class="m-0 text-center text-white small">Copyright &copy; Your Website 2019</p>
                </div>
            </footer>

            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        </body>
    </div>
        );
    }
}

export default Home;
