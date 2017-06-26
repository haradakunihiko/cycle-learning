from graphene_django import DjangoObjectType
import graphene
from django.contrib.auth.models import User as UserModel
# from graphene_django.filter import DjangoFilterConnectionField
from quiz import models
import logging
from collections import Counter
# class User(DjangoObjectType):
#     class Meta:
#         model = UserModel


class QuiestionLog(DjangoObjectType):
    class Meta:
        model = models.QuestionLog
        interfaces = (graphene.relay.Node, )


class QuizLog(DjangoObjectType):
    class Meta:
        model = models.QuizLog
        interfaces = (graphene.relay.Node,)


class QuizLogStat(graphene.ObjectType):
    class Meta:
        interfaces = (graphene.relay.Node, )

    quiz = graphene.Field(lambda: Quiz)
    logs = graphene.List(lambda: QuizLog)


class QuizLogHistgram(graphene.ObjectType):
    class Meta:
        interfaces = (graphene.relay.Node, )

    quiz_log_stats = graphene.List(lambda: QuizLogStat)


class Session(DjangoObjectType):
    class Meta:
        model = models.Session
        interfaces = (graphene.relay.Node,)

    correct_count = graphene.Int()

    def resolve_correct_count(self, *_):
        return self.quiz_logs.filter(score=1).count()


class User(DjangoObjectType):
    class Meta:
        model = models.User
        interfaces = (graphene.relay.Node,)

    # session = graphene.Field(lambda: Session, session_id= graphene.String(required=True))

    # @graphene.resolve_only_args
    # def resolve_session(self, session_id):
    #     return models.Session.get(session_id)


class Namespace(graphene.ObjectType):
    text = graphene.String()
    count = graphene.Int()


class Book(DjangoObjectType):
    class Meta:
        model = models.Book
        interfaces = (graphene.relay.Node, )

    namespaces = graphene.List(lambda: Namespace, path=graphene.String())

    def resolve_namespaces(self, args, context, info):
        result = []
        query = None
        counter = Counter()
        query = self.quizes.all()

        if 'path' in args:
            query = query.filter(namespace__istartswith=args['path'])

        for quiz in query:
            counter[quiz.namespace] += 1

        for namespace in counter:
            result.append(Namespace(text=namespace, count=counter[namespace]))

        return result


class BookLog(DjangoObjectType):
    class Meta:
        model = models.BookLog
        interfaces = (graphene.relay.Node, )

    book_histgram = graphene.Field(lambda: QuizLogHistgram)

    @graphene.resolve_only_args
    def resolve_book_histgram(self):
        quiz_log_stats = []
        for quiz in self.book.quizes.all():
            logs = models.QuizLog.objects.filter(quiz=quiz, user=self.user).order_by('-created')
            logs = filter(lambda log: log.score is not None, logs)[0:3]

            quiz_log_stat = QuizLogStat(id=str(quiz.id), quiz=quiz, logs=logs)
            quiz_log_stats.append(quiz_log_stat)

        return QuizLogHistgram(quiz_log_stats=quiz_log_stats)


class Quiz(DjangoObjectType):
    class Meta:
        model = models.Quiz
        interfaces = (graphene.relay.Node,)


class Viewer(graphene.ObjectType):
    class Meta:
        interfaces = (graphene.relay.Node, )
    anonymous = graphene.Boolean()
    user = graphene.Field(lambda: User)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    viewer = graphene.Field(lambda: Viewer)
    quizes = graphene.List(lambda: Quiz)
    users = graphene.List(lambda: User)

    def resolve_viewer(self, args, context, info):
        if context.user.is_authenticated():
            return Viewer(id="viewer", anonymous=False, user=context.user)
        else:
            return Viewer(id="viewer", anonymous=True)

    @graphene.resolve_only_args
    def resolve_quizes(self):
        return models.Quiz.objects.all()

    @graphene.resolve_only_args
    def resolve_users(self):
        return models.User.objects.all()


schema = graphene.Schema(query=Query)
