# Mathify UML Diagram

---

# User Management

## Abstract Class: User

Authentication is handled by Firebase — the server never stores credentials.
Identity (uid, email, display name) arrives via `AuthUser` after ID-token
verification; this model holds the persisted profile, keyed by the Firebase uid.

### Attributes
- userId : String        // Firebase uid
- name : String
- email : String

### Methods
- getUserId() : String
- getName() : String
- setName(String)
- getEmail() : String
- setEmail(String)

---

## Class: Admin

Extends `User`.

### Attributes
- role : Role
- lastLoginAt : LocalDateTime

### Enum: Role
- OWNER
- EDITOR
- VIEWER

### Methods
- Admin()
- Admin(name : String, email : String)
- Admin(name : String, email : String, role : Role)
- getRole() : Role
- setRole(Role)
- getLastLoginAt() : LocalDateTime
- setLastLoginAt(LocalDateTime)
- canEdit() : boolean
- isOwner() : boolean

---

## Class: Student

### Attributes
- studentId : String
- subscription : Subscribable
- progress : UserProgress
- energy : int

### Methods
- getStudentId() : String
- getSubscription() : Subscribable
- setSubscription(Subscribable)
- getProgress() : UserProgress
- setProgress(UserProgress)
- getEnergy() : int
- getPremium() : boolean
- addEnergy(int)
- removeEnergy(int)

---

## Interface: Subscribable

### Methods
- extendSubscription(expiry : LocalDate)
- isActive() : boolean
- changePlan(plan : Plan)
- getSubscriptionPlan() : String
- subscriptionExpiry() : LocalDate
- cancelSubscription()

---

## Enum: Plan

- MONTHLY
- ANNUAL

---

## Class: PremiumStudent

### Attributes
- subscriptionPlan : String
- subscriptionExpiry : LocalDate
- isCanceled : boolean

### Methods
- PremiumStudent(plan : String, expiry : LocalDate)
- extendSubscription(expiry : LocalDate)
- isActive() : boolean
- changePlan(plan : Plan)
- getSubscriptionPlan() : String
- subscriptionExpiry() : LocalDate
- cancelSubscription()

---

# Progress System

## Class: UserProgress

### Attributes
- studentId : String
- totalXP : int
- level : int
- currentStreak : int
- courseEnrollments : Map<String, CourseEnrollment>
- chapterProgress : Map<String, ChapterProgress>
- quizAttempts : Map<String, QuizAttempt>
- achievements : List<Achievement, Date>

### Methods
- UserProgress(studentId : String)
- getStudentId() : String
- getTotalXP() : int
- getLevel() : int
- addXP(int)
- addLevel(int)
- getCurrentStreak() : int
- addStreak(int)
- resetStreak()
- enrollCourse(courseId : String)
- completeCourse(courseId : String)
- hasCompletedCourse(courseId : String) : boolean
- getCourseEnrollment(courseId : String)
- completeChapter(chapterId : String, timeSpent : Duration)
- hasCompletedChapter(chapterId : String) : boolean
- getChapterProgress(chapterId : String)
- recordQuizAttempt(attempt : QuizAttempt)
- hasAttemptedQuiz(quizId : String) : boolean
- getQuizAttempt(quizId : String)
- hasPassedQuiz(quizId : String, passingScore : int) : boolean
- countCompletedCourses() : long
- averageQuizScore() : double
- completeAchievement(achievement : Achievement)
- hasAchievement(achievementId : String) : boolean
- getAchievements()

---

## Record: CourseEnrollment

### Fields
- courseId : String
- enrolledAt : LocalDateTime
- completedAt : LocalDateTime

### Methods
- isCompleted() : boolean

---

## Record: ChapterProgress

### Fields
- chapterId : String
- completedAt : LocalDateTime
- timeSpent : Duration

---

## Record: QuizAttempt

### Fields
- quizId : String
- score : int
- completedAt : DateTime

### Methods
- isPassed(passingScore : int) : boolean

---

## Class: Achievement

### Attributes
- achievementId : String
- title : String
- category : String
- requirement : String

### Methods
- Achievement()
- getId()
- setId(String)
- getTitle()
- setTitle(String)
- getCategory()
- setCategory(String)
- getRequirement()
- setRequirement(String)

---

# Course System

## Class: Course

### Attributes
- courseId : String
- title : String
- description : String
- category : String
- prerequisite : List<Course>
- chapters : List<Chapter>

### Methods
- Course(String, List<Chapter>)
- getCourseId()
- setCourseId(String)
- getTitle()
- setTitle(String)
- getDescription()
- setDescription(String)
- getCategory()
- setCategory(String)
- getChapters()
- setChapters(List<Chapter>)

---

## Class: Chapter

### Attributes
- chapterId : String
- title : String
- description : String
- xpReward : int
- modules : List<LearningModule>
- quizzes : List<Quiz>

### Methods
- getId()
- getTitle()
- getDescription()
- getXpReward()
- getPrerequisite()
- getModules()
- getQuizzes()
- setModules(List<LearningModule>)
- setTitle(String)
- setDescription(String)
- setXpReward(int)
- setPrerequisite(List<Chapter>)
- setQuizzes(List<Quiz>)

---

# Learning Modules

## Interface: LearningModule

### Methods
- getId() : String
- getTitle() : String
- getOrderIndex() : int
- getCreatedAt() : LocalDateTime
- getType() : ModuleType
- estimatedDuration() : Duration

---

## Enum: ModuleType

- VIDEO
- SLIDE

---

## Record: ModuleInfo

### Fields
- id : String
- title : String
- orderIndex : int
- createdAt : LocalDateTime

---

## Record: Slide

### Fields
- order : int
- imageUrl : String
- caption : String

---

## Class: SlideModule

### Attributes
- info : ModuleInfo
- slides : List<Slide>
- secondsPerSlide : int

### Methods
- getInfo()
- getType()
- estimatedDuration()
- getSlides()
- getSecondsPerSlide()

---

## Class: VideoModule

### Attributes
- info : ModuleInfo
- videoUrl : String
- duration : Duration
- thumbnailUrl : String

### Methods
- getInfo()
- getType()
- estimatedDuration()
- getVideoUrl()
- getThumbnailUrl()

---

# Quiz System

## Enum: QuestionType

- MULTIPLE_CHOICE
- FILL_BLANK
- DRAG_AND_DROP

---

## Record: QuestionInfo

### Fields
- id : String
- prompt : String
- points : int

---

## Interface: Question

### Methods
- getInfo() : QuestionInfo
- getType() : QuestionType
- evaluate(answer : Answer) : boolean

---

## Class: MultipleChoiceQuestion

### Attributes
- info : QuestionInfo
- options : List<Option>
- correctOptionIds : Set<String>

### Nested Record: Option
- id : String
- text : String

### Methods
- getInfo()
- getType()
- evaluate(answer : Answer)
- getOptions()

---

## Class: FillBlankQuestion

### Attributes
- info : QuestionInfo
- correctAnswers : List<String>
- caseSensitive : boolean

### Methods
- getInfo()
- getType()
- evaluate(answer : Answer)

---

## Class: DragDropQuestion

### Attributes
- info : QuestionInfo
- draggables : List<DragItem>
- dropZones : List<DropZone>
- correctPairings : Map<String, String>

### Methods
- getInfo()
- getType()
- evaluate(answer : Answer)
- getDraggables()
- getDropZones()

---

## Class: Quiz

### Attributes
- quizId : String
- title : String
- questions : List<Question>
- passingScore : int

### Methods
- totalPoints() : int

---

# Answer Hierarchy

## Interface: Answer

Permits:
- MultipleChoiceAnswer
- FillBlankAnswer
- DragAndDropAnswer

### Records

#### MultipleChoiceAnswer
- selectedOptionIds : Set<String>

#### FillBlankAnswer
- filledValues : List<String>

#### DragAndDropAnswer
- pairings : Map<String, String>