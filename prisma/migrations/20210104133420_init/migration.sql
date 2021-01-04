-- CreateTable
CREATE TABLE "Todolist" (
"id" SERIAL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "todolistId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD FOREIGN KEY("todolistId")REFERENCES "Todolist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
