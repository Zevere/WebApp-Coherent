import { User } from './models/user';
import { TaskList } from './models/task-list';
import { Comment } from './models/comment';
import { TaskItem } from './models/task-item';

const testUsers: User[] = [];
const testTaskLists: TaskList[] = [];
const testTaskItems: TaskItem[] = [];

// TEST USERS

const userAlice = <User> {
    firstName: 'Alice',
    lastName: 'Anderson',
    id: 'alice0',
    daysJoined: 72,
    token: 'abcdluwercrynouitm'
};

const userBobby = <User> {
    firstName: 'Bob',
    lastName: 'Brandon',
    id: 'bobby',
    daysJoined: 50,
    token: 'abcdlkdsfgbjio23946'
};

const userChuck = <User> {
    firstName: 'Chuck',
    lastName: 'Chadwick',
    id: 'chuck_chw',
    daysJoined: 103,
    token: 'sdfasxzcn34n5abcd'
};

const userDave = <User> {
    firstName: 'Dave',
    lastName: 'Derril',
    id: 'dave.d2',
    daysJoined: 10,
    token: '234fbfgbtyjyujabcd'
};

testUsers.push(userAlice);
testUsers.push(userBobby);
testUsers.push(userChuck);
testUsers.push(userDave);

// TEST TASK LISTS

const listProject = <TaskList>{
    title: 'COMP 308 Project',
    id: 'my-school-project',
    owner: 'bobby',
    collaborators: ['chuck_chw', 'dave.d2'],
    createdAt: new Date(Date.now() - 15 * 86400000),
    description: 'My school project for COMP 308 - Emerging Technology',
    tags: [`_kind:project`, `_icon:graduation-cap`],
    comments: [
        <Comment>{
            id: 'asdfljdnvkjdhfg32q4',
            text: `I like the business idea of the project. sounds helpful :)))`,
            authorId: 'dave.d2',
            postedAt: new Date(Date.now() - 13 * 86400000),
            status: 'edited',
        },
        {
            id: 'adfadsfgdgv46',
            authorId: 'bobby',
            postedAt: new Date(Date.now() - 7 * 86400000),
            modifiedAt: new Date(Date.now() - 6.8 * 86400000),
            status: 'redacted'
        },
        {
            id: 'vlcimhbu4578asdf4',
            text: `Good job team! we are almost done`,
            authorId: 'chuck_chw',
            postedAt: new Date(Date.now() - 3 * 60000),
            status: 'posted'
        },
    ]
};

const listGroceries = <TaskList>{
    title: 'Groceries @ Food Basics',
    id: 'groceries',
    owner: 'alice0',
    createdAt: new Date(Date.now() - 86400000),
    tags: [`_kind:todo`, `_icon:shopping-basket`],
};

userAlice.lists = [listGroceries];
userBobby.lists = [listProject];

testTaskLists.push(listProject);
testTaskLists.push(listGroceries);

// TEST TASK ITEMS

const taskProjectBacklog0 = <TaskItem> {
    title: 'Use font awesome 5 for icons',
    id: 'cxvnuih4asdfgfghmjghr',
    list: 'my-school-project',
    creator: 'chuck_chw',
    createdAt: new Date(Date.now() - 80),
    tags: [`_stage:backlog`, `_priority:low`],
};

const taskProjectToDo0 = <TaskItem> {
    title: 'Invalid username allowed on registration form',
    id: 'dfgfvbncxvnuih4rsfdvb',
    list: 'my-school-project',
    description: 'A "@" character is currently considered allowed for username field of registration form.',
    creator: 'bobby',
    createdAt: new Date(Date.now() - .5 * 86400000),
    assignees: ['chuck_chw'],
    tags: [`_stage:todo`, `_priority:medium`, `_kind:bug`],
};

const taskProjectInProgress0 = <TaskItem> {
    title: 'User profile view',
    id: 'cxvnuih4rsfdvb67576sdc',
    list: 'my-school-project',
    description: `It allows users to see their info and modify them. All client side validations should also be implemented.`,
    creator: 'bobby',
    assignees: ['bobby', 'chuck_chw'],
    createdAt: new Date(Date.now() - .5 * 86400000),
    tags: [`_stage:in_progress`, `_priority:high`, '_progress:36'],
    comments: [
        <Comment>{
            id: 'lcfgkjuhb34ttrghdsf',
            authorId: 'chuck_chw',
            text: 'We could break this into two tasks: show and modify.',
            postedAt: new Date(Date.now() - 3600000),
            status: 'posted',
        }
    ]
};

const taskProjectInProgress1 = <TaskItem> {
    title: 'Create indexes on unique model fields',
    id: 'dfghyjio5jdvb67576756d',
    list: 'my-school-project',
    creator: 'dave.d2',
    createdAt: new Date(Date.now() - 2 * 86400000),
    tags: [`_stage:in_progress`, `_priority:low`],
};


const taskProjectDone0 = <TaskItem> {
    title: 'Design MongoDb schema',
    id: 'make-schema',
    description: 'Models include User, TaskList and TaskItem',
    list: 'my-school-project',
    creator: 'dave.d2',
    createdAt: new Date(Date.now() - 12 * 86400000),
    tags: [`_stage:done`, `_priority:high`, '_progress:93'],
};

const taskProjectDone1 = <TaskItem> {
    title: 'Design home view',
    id: 'mbk5ih4rsfdvb67576hn',
    list: 'my-school-project',
    description: 'Design landing page using bootstrap4 framework and HTML + CSS',
    creator: 'bobby',
    assignees: ['bobby', 'chuck_chw'],
    createdAt: new Date(Date.now() - 11.3 * 86400000),
    tags: [`_stage:done`, `_priority:high`],
};

listProject.tasks = [
    taskProjectBacklog0,
    taskProjectToDo0,
    taskProjectInProgress0,
    taskProjectInProgress1,
    taskProjectDone0,
    taskProjectDone1,
];

testTaskItems.push(...listProject.tasks);

export { testUsers, testTaskLists, testTaskItems };
