import requests

# Function to get most active contributors for a given GitHub repository
def get_most_active_contributors(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}/contributors"
    headers = {"Authorization": "token your_github_token"}
    
    # Fetching contributors (only the first 100)
    response = requests.get(url, headers=headers, params={"per_page": 100})
    contributors = response.json()
    
    # Checking if the response contains the contributors list
    if isinstance(contributors, list):
        # Saving the output to a Markdown file
        with open(f"{owner}_{repo}_contributors.md", "w") as md_file:
            md_file.write("# Most Active Contributors\n\n")
            md_file.write("| User | Contributions |\n")
            md_file.write("| ---- | -------------- |\n")
            for contributor in contributors:
                # Adding hyperlinks to GitHub user handles
                md_file.write(f"| [{contributor['login']}](https://github.com/{contributor['login']}) | {contributor['contributions']} |\n")
        print(f"Output saved to {owner}_{repo}_contributors.md")
    else:
        print(f"Error fetching contributors for {owner}/{repo}: {contributors.get('message', 'Unknown error')}")

# Example usage for a Blockchain project
print("Most active contributors for a Blockchain project:")
get_most_active_contributors("ethereum", "go-ethereum")

# Example usage for XDC Network
print("\nMost active contributors for XDC Network")
get_most_active_contributors("XinFinOrg", "XDPoSChain")

# Example usage for an AI project
print("\nMost active contributors for an AI project:")
get_most_active_contributors("tensorflow", "tensorflow")

