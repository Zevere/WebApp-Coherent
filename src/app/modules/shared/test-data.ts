import { User } from './models/user';
import { TaskList } from './models/task-list';
import { Comment } from './models/comment';
import { TaskItem } from './models/task-item';

const testUsers: User[] = [];
const testTaskLists: TaskList[] = [];
const testTaskItems: TaskItem[] = [];

const bobby = <User> {
    firstName: 'Bob',
    lastName: 'Brandon',
    id: 'bobby',
    daysJoined: Date.now(),
    token: 'abcd'
};

const schoolProject = <TaskList>{
    title: 'School Project',
    id: 'my-school-project',
    owner: 'bobby',
    collaborators: ['alice0', 'chuck', 'dave.d2'],
    createdAt: new Date(),
    description: 'My school project for COMP 308 - Emerging Technology',
    tags: [`_kind:project`, `_icon:graduation-cap`],
    tasks: [],
    comments: [
        <Comment>{
            id: 'asdfljdnvkjdhfg32q4',
            text: `I don't like to do this project :p`,
            authorId: 'bobby',
            postedAt: new Date(),
            status: 'edited',
        },
        {
            id: 'adfadsf',
            authorId: 'alice0',
            text: '',
            postedAt: new Date(),
            modifiedAt: new Date(),
            status: 'redacted'
        }
    ]
};

const chuckComment = <Comment> {
    id: 'laksdnf7y',
    postedAt: new Date(),
    text: 'This is an edited comment',
    authorId: 'chuck',
    status: 'edited',
    modifiedAt: new Date(),
};


const todo0 = <TaskItem> {
    title: 'Create Home view',
    description: 'Landing page should include info about the project and the benefits for users',
    id: 'cxvnuih4r',
    creator: 'bobby',
    comments: [chuckComment],
    createdAt: new Date(),
    tags: [`_stage:in_progress`, `_priority:medium`],
};
const todo1 = <TaskItem> {
    title: 'Design MongoDb schema',
    description: 'Models include User, TaskList and TaskItem',
    id: 'make-schema',
    creator: 'alice0',
    createdAt: new Date(),
    tags: [`_stage:done`, `_priority:high`],
};

bobby.lists = [schoolProject];
schoolProject.comments.push(chuckComment);
schoolProject.tasks.push(todo0);
schoolProject.tasks.push(todo1);

testUsers.push(bobby);
testTaskLists.push(schoolProject);
testTaskLists.push(schoolProject);
testTaskLists.push(schoolProject);
testTaskItems.push(todo0);
testTaskItems.push(todo1);

export { testUsers, testTaskLists, testTaskItems };
