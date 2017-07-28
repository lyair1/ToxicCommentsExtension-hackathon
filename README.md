# ToxicCommentsExtension-hackathon
a Chrome extension to block \ hide toxic comments from social media.


Using ML (Azure ML Studio) we built a classifying algorithm to classify comments as "Toxic" or "Non Toxic".
We plugged it into a Chrome extension to filter \ hide toxic comments on Twitter, FB, YouTube and Reddit.

We hacked this project as part of the One Week Hackathon at Microsoft SVC (Mountain View, CA).

Configure sensitivity level:

<p align="center">
  <img src ="/readmeAssets/extension popup.PNG" />
</p>


The extension will automatically hide all 'toxic' comments:

<p align="center">
  <img src ="/readmeAssets/hideToxicComments.PNG" />
</p>


You can still hover on the comment to see the original toxic text:

<p align="center">
  <img src ="/readmeAssets/hideToxicComments-hover.PNG" />
</p>


We used Azure Machine Learning studio to classify comments with toxic level:

<p align="center">
  <img src ="/readmeAssets/MLGraph.PNG" />
</p>
