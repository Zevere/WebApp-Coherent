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
    owner: 'bobby',
    collaborators: ['alice0', 'chuck', 'dave.d2'],
    createdAt: new Date(),
    description: 'My school project for COMP 308 - Emerging Technology',
    tags: [`_kind:project`, `_icon:graduation-cap `],
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

bobby.lists = [schoolProject];
schoolProject.comments.push(chuckComment);


testUsers.push(bobby);
testTaskLists.push(schoolProject);
testTaskLists.push(schoolProject);
testTaskLists.push(schoolProject);
testTaskLists.push(schoolProject);
testTaskLists.push(schoolProject);

export { testUsers, testTaskLists };
