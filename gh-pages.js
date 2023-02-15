var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/bezpechno/QuickWeather.git', 
        user: {
            name: 'bezpechno', // update to use your name
            email: 'mnesterenko1989@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)