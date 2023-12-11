[Requiremnet-Analysis](https://docs.google.com/document/d/10mkjS8boCQzW4xpsESyzwCCLJcM3hvLghyD_TeXPBx0/edit?usp=sharing)

[ER Diagram: 1](./ER_Diagram.png)
[ER Diagram: 2](./ER%20Diagram2.png)

# Using Transition and rollBack and user Create

- create session
  -- const session = await mongoose.startSession()

- start session
  -- session.startTransaction()
- // create a user (transaction - 1)
  -- const newUser = await User.create([userData], { session }); //array before object use transaction
- await session.commitTransaction();
- await session.endSession();
  --error block
- await session.abortTransaction();
- await session.endSession();

```ts
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); //array before object use transaction

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    //create a student (transaction-2)

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // session successful then commit as result save to database
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};
```
