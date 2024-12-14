$(document).ready(() => {
    $('.loader').show();
    $('.lotr-quotes').hide();
    $('.spn-quotes').hide();
    $('.strng-thing-quotes').hide();
    $('.morningstar-quotes').hide();
    $('.hp-quotes').hide();
    $('.asoif-quotes').hide();
    //$('.chuck-norris').hide();

    function getChuckQuote() {
        $('.chuck-norris').show();
        $('#chuck-norris-loader').hide();

        $.ajax({
            url: 'https://api.chucknorris.io/jokes/random',
            type: 'GET',
            success: (joke) => {
                const punchline = joke.value;

                $('.chuck-norris > .card > .row > .col-lg-9 > .card-body > .card-text').append(punchline);
                $('.chuck-norris > .card > .row > .col-lg-9 > .card-body > .card-subtitle').append(joke.updated_at)
            },
            error: (error) => {
                console.log(error);
                alert(error);
            }
            
        });
    }

    function getASOIF() {
        $('.asoif-quotes').show();
        $('#asoif-loader').hide();

        $.ajax({
            url: 'https://api.gameofthronesquotes.xyz/v1/random',
            type: 'GET',
            success: (data) => {
                const character = data.character;
                const sentence = data.sentence;
                let Date = 

                console.log(sentence);
                console.log(character);
                console.log(data);

                $('#asoif-quotes').append(sentence);
                $('#asoif-character').append(character.name);
                $('')
            },
            error: (error) => {
                console.error('Error: ' + error);
                alert('Error: ' + error);
            }
        });
    }

    getChuckQuote();
    getASOIF();
});
