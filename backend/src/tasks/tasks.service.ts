import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (task?.name) return task;

    throw new HttpException(
      'Essa tarefa não foi encontrada',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        dueDate: new Date(createTaskDto.dueDate),
        completed: false,
      },
    });

    return newTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTask) {
        throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
      }

      const task = await this.prisma.task.update({
        where: {
          id: findTask.id,
        },
        data: updateTaskDto,
      });

      return task;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao deletar essa tarefa',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(id: number) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: {
          id: id,
        },
      });

      if (!findTask) {
        throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
      }

      await this.prisma.task.delete({
        where: {
          id: findTask.id,
        },
      });

      return {
        message: 'Tarefa deletada com sucesso',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Falha ao deletar essa tarefa',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
