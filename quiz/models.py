# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.db import models
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Book(models.Model):
    label = models.CharField(max_length=1024, default="")

    def __str__(self):
        return self.label


@python_2_unicode_compatible
class Quiz(models.Model):
    book = models.ForeignKey(Book, related_name='quizes')
    namespace = models.CharField(max_length=1024, default="/")
    text = models.TextField()
    solution = models.TextField()

    def __str__(self):
        return self.namespace


@python_2_unicode_compatible
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions')
    order = models.IntegerField()
    text = models.TextField()
    solution = models.TextField()
    correct = models.IntegerField()

    def __str__(self):
        return self.text


@python_2_unicode_compatible
class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options')
    value = models.IntegerField()
    label = models.CharField(max_length=1024)

    def __str__(self):
        return self.label


# TODO rename
class BookLog(models.Model):
    book = models.ForeignKey(Book, related_name='book_logs')
    user = models.ForeignKey(User, related_name='book_logs')


class Session(models.Model):
    book_log = models.ForeignKey(BookLog, related_name='sessions')
    started = models.DateTimeField(auto_now_add=True)


class QuizLog(models.Model):
    user = models.ForeignKey(User, related_name='quiz_logs')
    quiz = models.ForeignKey(Quiz, related_name='quiz_logs')
    session = models.ForeignKey(Session, related_name='quiz_logs')
    order = models.IntegerField()
    score = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)


class QuestionLog(models.Model):
    question = models.ForeignKey(Question, related_name='question_logs')
    quiz_log = models.ForeignKey(QuizLog, related_name='question_logs')
    order = models.IntegerField()
    selected = models.IntegerField()
