<html>

<head>
    <title>Check It</title>
    <link href="style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
</head>

<body id="main-body">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
        crossorigin="anonymous"></script>
        <div id='my-tool-tip' class="ui raised segment mymenu" style="display: none;">
        <div class="ui list mymenu-options" style="text-align: center;">

        </div>
    </div>
    <div class="ui raised very padded text container violet inverted segment">
        <div class="two column wide ">
            <div class="ui inverted tertiary violet segment">
                <div class="ui huge header">
                    <h1>
                        Check it!
                    </h1>
                    <div class="sub header">A Grammarly Clone</div>
                </div>
            </div>
            <div class="grid centered">
                <div class="ui form centered">
                    <div class="center aligned row field">
                        <input class="inverted tertiary violet" type="file" accept=".txt" id="input-file" required
                            oninput="displayFunc();" onchange="readFile(this);"></br>
                    </div>
                    <div class="center aligned row field ">
                        <input type="text" readonly='' id="path-display"> </br>
                    </div>
                    <!-- <div id="text-content"></div> -->
                    <div class="ui inverted tertiary violet segment" id="text-content">
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</body>

</html>
