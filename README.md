# GitHub Contributors Fetcher

This Node.js script fetches the most active contributors for specified GitHub repositories and saves the information to Markdown files, one for each repository.

## Usage

### Prerequisites

Before using the script, ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:


2. Navigate to the project directory:

    ```bash
    cd Active-Github-User-
    ```

3. Install the required dependencies:

    ```bash
    npm install axios dotenv
    ```

### Configuration

Create a `.env` file in the root directory of your project and add the following variables:


        GITHUB_TOKEN=your_github_token
        REPOS=owner1/repo1,owner2/repo2


Replace `your_github_token` with your actual GitHub token and `owner1/repo1,owner2/repo2` with the repositories you want to fetch contributors from.

### How to Run

Once you have configured your `.env` file, you can run the script with the following command:

```bash
node contributors.js
```

# Repository Contributors Links

- [ethereum/go-ethereum Contributors](./ethereum_go-ethereum_contributors.md)
- [XinFinOrg/XDPoSChain Contributors](./XinFinOrg_XDPoSChain_contributors.md)
- [tensorflow/tensorflow Contributors](./tensorflow_tensorflow_contributors.md)
- [openai/openai-cookbook Contributors](./openai_openai-cookbook_contributors.md)