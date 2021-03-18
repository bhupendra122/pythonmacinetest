## avda-api

This backend service that provides the backend for the `avda-mobile` react-native mobile application.

### Dependencies

- [make]() - most posix OS's come with `make`
- [bumpversion](https://pypi.org/project/bumpversion/)
- [docker](https://docs.docker.com/desktop/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Development

```bash
# get .env
# install dependencies
$ make init
# run locally
$ make dev
# hit http://localhost:3006
```

Currently, the app does not appear to require a database connection to run, however, we have deployed
a database on the GKE infrastructure on a private network. To access the DB to local, one must port-forward
the connection locally:

```bash
# forward db
$ kubectl port-forward --namespace default svc/avda-db-postgresql 5432:5432
# to test connection, in another terminal run with the admin password
$ PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U postgres -d postgres -p 5432
# this will be required once the API once the DB client is implemented
```

### Deployment

```bash
# version
$ make bumpversion-patch
# commit code
# push code to `prod` branch
# code will then deployed in an automated fashion
```

### Environments

- `prod`: `https://api.avda.pineappleworkshop.com` _<- subject to change_

---

_All the information below is from the previous developers_

**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

*We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket.*

---

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).

## Setup:

Now you have cloned the code on your local. Please follow these steps to setup the project.

Requirements: 
Node version > 8
1. PostgreSQL
2. sequelize


Please use the node version > 8
1. cd project folder
2. run npm install // To install all the dependencies
3. Once npm install is done please check the config file for data base configuration
4. you can use the same or change it according to your own choice.
5. in terminal form project folder please run sequelize db:create. It will create a database for you to run project locally.
6. Once the database is created please run the following command to create database tables for you. sequelize db:migrate
it will run all the migration and database will be ready for you to use.
7. Once you are done with all these steps please run a few commands which are already added in package.json file for scripts to add default data in to the database.

## ENV variables
After completing all these steps you are ready for development.

Please copy env.emaple file to .env to use the variables and update values accordingly.

## Server Start:

npm run dev

it will start a dev server for you to get going.

## Info

Server will be started on port 3006 by default but you can change it to any other you like in .env file