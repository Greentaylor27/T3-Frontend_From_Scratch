$(document).ready(() => {
    $('.loader').show();
    $('.lotr-quotes').hide();
    $('.spn-quotes').hide();
    $('.strng-thing-quotes').hide();
    $('.morningstar-quotes').hide();
    $('.hp-quotes').hide();
    $('.asoif-quotes').hide();
    //$('.chuck-norris').hide();

    const updatedAt = $('.updated-at');
    let today = new Date();
    updatedAt.append(today.toDateString());

    function getChuckQuote() {
        $('.chuck-norris').show();
        $('#chuck-norris-loader').hide();

        $.ajax({
            url: 'https://api.chucknorris.io/jokes/random',
            type: 'GET',
            success: (joke) => {
                const punchline = joke.value;

                $('.chuck-norris > .card > .row > .col-lg-9 > .card-body > .card-text').append(punchline);
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
            url: 'https://thronesapi.com/api/v2/Characters',
            type: 'GET',
            success: (data) => {
                const characters = Object.keys(data);
                const randomCharacter = Math.floor(Math.random() * characters.length);
                const characterName = data[randomCharacter].fullName;

                const nameArr = characterName.toLowerCase().split(" ");
                const firstName = nameArr[0];

                for (let i = 0; i < characters.length; i++) {
                    if (data[i].id === randomCharacter) {
                        $('#asoif-character').append(`${data[i].fullName}, ${data[i].title}`);
                        $('#asoif-character-pic').attr('src', data[i].imageUrl);
                    }
                }

                $.ajax({
                    url: `https://api.gameofthronesquotes.xyz/v1/author/${firstName}`,
                    type: 'GET',
                    success: (element) => {
                        if (element) {
                            $('#asoif-quotes').empty();
                            $('#asoif-quotes').append(element.sentence);
                        }
                    },
                    error: (error) => {
                        console.error('Error: ' + error);
                        alert('Error: ' + error);
                    }
                });

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
