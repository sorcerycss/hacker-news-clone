import Story from '../components/Story.js';
import view from '../utils/view.js';

// Renders the stories view for a given route
export default async function Stories(path) {
    const stories = await getStories(path);
    const hasStories = stories.length > 0;

    // Temporary rendering — just stringifying story objects for now
    view.innerHTML = `<div>
        ${hasStories ? stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories'}
    </div>`;
}

// Fetches stories from the Hacker News API based on the current route
async function getStories(path) {
    // Map app routes to their corresponding API endpoints
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';
    if (isHomeRoute) {
        path = '/news';
    } else if (isNewRoute) {
        path = '/newest';
    }
    const response = await fetch(`https://node-hnapi.herokuapp.com${path}`);
    const stories = await response.json();
    return stories;
}
