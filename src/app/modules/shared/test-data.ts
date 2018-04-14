import { User } from './models/user';
import { TaskList } from './models/task-list';
import { Comment } from './models/comment';

const testUsers: User[] = [];
const testTaskLists: TaskList[] = [];

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
    createdAt: new Date(),
    description: 'My school project for COMP 308 - Emerging Technology',
    tags: [`_kind:project`, `_icon:graduation-cap `],
    comments: [
        <Comment>{
            id: 'asdfljdnvkjdhfg32q4',
            text: `I don't like to do this project :p`,
            author: 'bobby',
            postedAt: new Date(),
            status: 'edited',
        },
        {
            id: 'adfadsf',
            author: 'alice0',
            text: '',
            postedAt: new Date(),
            modifiedAt: new Date(),
            status: 'redacted'
        }
    ]
};

bobby.lists = [schoolProject];


testUsers.push(bobby);
testTaskLists.push(schoolProject);

export { testUsers, testTaskLists };
