import { faker } from '@faker-js/faker';


const data = [...Array(20).keys()].map(() => ({
    image: faker.image.url({}),
    bg: faker.color.rgb(),
    title: faker.person.jobTitle(),
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    author: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar()
    }
}))


export type Item = (typeof data)[0];
export default data; 
