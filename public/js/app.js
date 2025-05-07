let num = prompt("Enter the number");
parseInt(num)
let rand = Math.floor(Math.random()*num + 1);
console.log(rand);
let guess = prompt("guess the number");

while(true)
{
    if (guess == 'quit')
    {
        console.log('you quit');
    }
    else if (guess == rand)
    {
        console.log(`congrats you guessed the correct number ${rand}`);
        break;
    }
    else if (guess < rand)
    {
        guess = prompt('your guess is small');
    }
    else if(guess > rand)
    {
        guess = prompt('your guess is high');
    }
}