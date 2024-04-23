require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const readmeContent = [];

// Function to get most active contributors for a given GitHub repository
async function getMostActiveContributors(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  };

  try {
    // Fetching contributors (only the first 100)
    const response = await axios.get(url, {
      headers: headers,
      params: { per_page: 100 }
    });
    const contributors = response.data;

    // Check if the response is an array
    if (Array.isArray(contributors)) {
      // Calculate total contributions
      const totalContributions = contributors.reduce((sum, contributor) => sum + contributor.contributions, 0);

      // Sorting contributors by contributions
      contributors.sort((a, b) => b.contributions - a.contributions);

      // Writing output to a Markdown file
      let data = "# Most Active Contributors\n\n";
      data += `Total Contributors: ${contributors.length}\n`;
      data += `Total Contributions: ${totalContributions}\n\n`;
      data += "| User | Contributions | Percentage of Total Contributions |\n";
      data += "| ---- | ------------- | -------------------------------- |\n";
      contributors.forEach(contributor => {
        const percentage = ((contributor.contributions / totalContributions) * 100).toFixed(2);
        data += `| [${contributor.login}](https://github.com/${contributor.login}) | ${contributor.contributions} | ${percentage}% |\n`;
      });
      const fileName = `${owner}_${repo}_contributors.md`;
      fs.writeFileSync(fileName, data);
      console.log(`Output saved to ${fileName}`);

      // Add link to README content
      readmeContent.push(`- [${owner}/${repo} Contributors](./${fileName})`);
    } else {
      console.log(`Error fetching contributors for ${owner}/${repo}: ${contributors.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`Error fetching contributors for ${owner}/${repo}: ${error.message}`);
  }
}

// Function to handle the list of repositories from the .env file and update the README.md
async function processRepositories() {
  const repos = process.env.REPOS.split(',');
  for (const repo of repos) {
    const [owner, repoName] = repo.split('/');
    console.log(`Most active contributors for ${owner}/${repoName}:`);
    await getMostActiveContributors(owner, repoName);
  }

  // Write README.md file
  fs.writeFileSync('README.md', '# Repository Contributors Links\n\n' + readmeContent.join('\n'));
  console.log('Updated README.md with contributors links.');
}

processRepositories();
