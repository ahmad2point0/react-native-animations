import { faker } from '@faker-js/faker';


export const MAX_MESSAGES = 6;
faker.seed(12)

export const generateChatMessage = () => {
    return {
        key: faker.string.uuid(),
        content: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
        description: faker.lorem.sentence(),
        user: {
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
        },
    };
};

export type ChatItem = ReturnType<typeof generateChatMessage>
