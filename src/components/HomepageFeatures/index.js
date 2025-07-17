import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Secure Your Clusters',
    Svg: require('@site/static/img/undraw_security.svg').default,
    description: (
      <>
        Learn how to implement security best practices for your Kubernetes clusters.
        Protect your infrastructure from common vulnerabilities and threats.
      </>
    ),
  },
  {
    title: 'Follow Best Practices',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Implement industry-standard security controls and follow CIS benchmarks
        to ensure your Kubernetes deployments meet compliance requirements.
      </>
    ),
  },
  {
    title: 'Powered by DevSecOps',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Integrate security into your CI/CD pipeline and adopt a DevSecOps approach
        to continuously monitor and improve your Kubernetes security posture.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
