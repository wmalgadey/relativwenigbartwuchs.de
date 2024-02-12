---
categories:
  - Webseite
source: https://huggingface.co/
tags:
  - ML
  - devel
---
Build, train and deploy state of the art models powered by the reference open source in machine learning.

More than 5,000 organizations are using Hugging Face

Hub

## Home of Machine Learning

Create, discover and collaborate on ML better.  
Join the community to start your ML journey.  

[Sign Up](https://huggingface.co/join)

![[activity-feed.png]]

Tasks

## Problems solvers

Thousands of creators work as a community to solve Audio, Vision, and Language with AI.

[Explore tasks](https://huggingface.co/tasks)

[Image Classification](https://huggingface.co/tasks/image-classification)

[2,284 models](https://huggingface.co/tasks/image-classification)

[Object Detection](https://huggingface.co/tasks/object-detection)

[287 models](https://huggingface.co/tasks/object-detection)

[Question Answering](https://huggingface.co/tasks/question-answering)

[3,898 models](https://huggingface.co/tasks/question-answering)

[Summarization](https://huggingface.co/tasks/summarization)

[875 models](https://huggingface.co/tasks/summarization)

[Text Classification](https://huggingface.co/tasks/text-classification)

[17,691 models](https://huggingface.co/tasks/text-classification)

[Translation](https://huggingface.co/tasks/translation)

[1,933 models](https://huggingface.co/tasks/translation)

Open Source

## Transformers

Transformers is our natural language processing library and our hub is now open to all ML models, with support from libraries like [Flair](https://github.com/flairNLP/flair), [Asteroid](https://github.com/asteroid-team/asteroid), [ESPnet](https://github.com/espnet/espnet), [Pyannote](https://github.com/pyannote/pyannote-audio), and more to come.

[Read documentation](https://huggingface.co/transformers)

huggingface@transformers:~

```
from transformers import AutoTokenizer, AutoModelForMaskedLM
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForMaskedLM.from_pretrained("bert-base-uncased")
```

On demand

## Inference API

Serve your models directly from Hugging Face infrastructure and run large scale NLP models in milliseconds with just a few lines of code.

[Learn more](https://huggingface.co/inference-api)

[distilbert-base-uncased](https://huggingface.co/distilbert-base-uncased)

[dbmdz/bert-large-cased-finetuned-conll03-english](https://huggingface.co/dbmdz/bert-large-cased-finetuned-conll03-english)

Science

## Our Research contributions

We’re on a journey to advance and democratize NLP for everyone. Along the way, we contribute to the development of technology for the better.

🌸

T0

### Multitask Prompted Training Enables Zero-Shot Task Generalization

Open source state-of-the-art zero-shot language model out of [BigScience](https://bigscience.huggingface.co/).

[Read more](https://bigscience.huggingface.co/blog/t0)

🐎

DistilBERT

### DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter

A smaller, faster, lighter, cheaper version of BERT obtained via model distillation.

[Read more](https://medium.com/huggingface/distilbert-8cf3380435b5)

📚

HMTL

### Hierarchical Multi-Task Learning

Learning embeddings from semantic tasks for multi-task learning. We have open-sourced code and a demo.

[Read more](https://arxiv.org/abs/1811.06031)

🐸

Dynamical Language Models

### Meta-learning for language modeling

A meta learner is trained via gradient descent to continuously and dynamically update language model weights.

[Read more](https://arxiv.org/abs/1803.10631)

🤖