(() => {
    'use strict';

    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    const terminalBody = document.getElementById('terminal-body');

    const history = [];
    let historyIndex = -1;

    const PROMPT_HTML =
        '<span class="prompt">' +
        '<span class="prompt-user">vasil</span>@<span class="prompt-host">devops</span>:' +
        '<span class="prompt-path">~</span>$ ' +
        '</span>';

    // ═══════════════════════════════════════════
    //  Command Registry
    // ═══════════════════════════════════════════

    const commands = {
        help:                        cmdHelp,
        whoami:                      cmdWhoami,
        'cat profile.md':            cmdProfile,
        'cat skills.yaml':           cmdSkills,
        'terraform plan':            cmdTerraform,
        'terraform':                 cmdTerraform,
        'kubectl get pods':          cmdKubectl,
        'kubectl get pods -A':       cmdKubectl,
        'kubectl':                   cmdKubectl,
        'docker ps':                 cmdDocker,
        'docker images':             cmdDocker,
        'docker':                    cmdDocker,
        'aws sts get-caller-identity': cmdAws,
        'aws':                       cmdAws,
        'git log':                   cmdGitLog,
        'git log --oneline':         cmdGitLog,
        'grafana-cli info':          cmdGrafana,
        'grafana':                   cmdGrafana,
        'prometheus':                cmdGrafana,
        'cat education.txt':         cmdEducation,
        'neofetch':                  cmdNeofetch,
        'clear':                     cmdClear,
        'cls':                       cmdClear,
        'exit':                      cmdExit,
        'sudo':                      cmdSudo,
        'rm -rf /':                  cmdRm,
        'ls':                        cmdLs,
        'cd':                        cmdCd,
        'cd terraform':              cmdTerraform,
        'cd terraform/':             cmdTerraform,
        'cd kubernetes':             cmdKubectl,
        'cd kubernetes/':            cmdKubectl,
        'cd docker':                 cmdDocker,
        'cd docker/':                cmdDocker,
        'cd aws':                    cmdAws,
        'cd aws/':                   cmdAws,
        'cd monitoring':             cmdGrafana,
        'cd monitoring/':            cmdGrafana,
        'cd ci-cd':                  cmdPipeline,
        'cd ci-cd/':                 cmdPipeline,
        'monitoring':                cmdGrafana,
        'pipeline':                  cmdPipeline,
        'ci':                        cmdPipeline,
        'ci-cd':                     cmdPipeline,
        'cicd':                      cmdPipeline,
        'gitlab-ci':                 cmdPipeline,
    };

    const commandNames = [
        'help', 'whoami', 'cat profile.md', 'cat skills.yaml',
        'cat education.txt', 'terraform', 'terraform plan',
        'kubectl', 'kubectl get pods', 'docker', 'docker ps',
        'aws', 'aws sts get-caller-identity', 'monitoring',
        'cicd', 'git log', 'grafana-cli info', 'pipeline',
        'neofetch', 'clear', 'ls',
        'cd terraform', 'cd kubernetes', 'cd docker',
        'cd aws', 'cd monitoring', 'cd ci-cd',
    ];

    // ═══════════════════════════════════════════
    //  Command Implementations
    // ═══════════════════════════════════════════

    function cmdHelp() {
        return `<span class="c-green c-bold">Available commands:</span>

  <span class="c-cyan">whoami</span>                          Identity & contact info
  <span class="c-cyan">cat profile.md</span>                  Professional profile
  <span class="c-cyan">cat skills.yaml</span>                 Technical skills overview
  <span class="c-cyan">cat education.txt</span>               Education details

  <span class="c-yellow c-bold">─── DevOps Tools ───</span>
  <span class="c-cyan">terraform</span>                       Infrastructure as Code experience
  <span class="c-cyan">kubectl</span>                         Kubernetes & orchestration work
  <span class="c-cyan">docker</span>                          Containerization experience
  <span class="c-cyan">aws</span>                             AWS cloud & certifications
  <span class="c-cyan">monitoring</span>                      Monitoring & observability stack
  <span class="c-cyan">cicd</span>                            CI/CD pipelines experience
  <span class="c-cyan">git log</span>                         Career timeline

  <span class="c-yellow c-bold">─── Navigation ───</span>
  <span class="c-cyan">ls</span>                              List directory contents
  <span class="c-cyan">cd &lt;folder&gt;</span>                     Explore a directory
  <span class="c-cyan">clear</span>                           Clear terminal
  <span class="c-cyan">neofetch</span>                        System info

  <span class="c-dim">Also works:</span> <span class="c-green">terraform plan</span><span class="c-dim">,</span> <span class="c-green">kubectl get pods</span><span class="c-dim">,</span> <span class="c-green">docker ps</span><span class="c-dim">,</span> <span class="c-green">grafana-cli info</span>`;
    }

    function cmdWhoami() {
        return `<span class="c-dim">uid=1000(vasil) gid=1000(devops) groups=1000(devops),27(sudo)</span>

  <span class="c-green c-bold">Name:</span>        Vasil Poliakov
  <span class="c-green c-bold">Role:</span>        DevOps Engineer
  <span class="c-green c-bold">Email:</span>       <a href="mailto:vasilpol203@gmail.com" style="color:var(--accent-cyan);text-decoration:none">vasilpol203@gmail.com</a>
  <span class="c-green c-bold">Phone:</span>       +380 (66) 839-99-05
  <span class="c-green c-bold">Credly:</span>      <a href="https://www.credly.com/users/username.e300a5aa/badges" target="_blank" rel="noopener" style="color:var(--accent-cyan);text-decoration:none">credly.com/users/vasil-poliakov</a>
  <span class="c-green c-bold">Languages:</span>   🇺🇦 Ukrainian (Native) · 🇬🇧 English (B1-B2) · 🇷🇺 Russian (C2)`;
    }

    function cmdProfile() {
        return `<span class="c-green c-bold"># Profile</span>

Highly motivated and goal-oriented DevOps engineer with <span class="c-white c-bold">three years</span>
of hands-on experience. A professional and hardworking individual,
dedicated to quality automation in the development process and the
implementation of DevOps technologies. I bring a curious mindset to
problem-solving and a continual desire to grow within the realm of
modern technologies.`;
    }

    function cmdSkills() {
        return `<span class="c-dim">---</span>
<span class="c-green c-bold">skills</span><span class="c-white">:</span>
  <span class="c-cyan">operating_systems_and_scripting</span><span class="c-white">:</span>
    <span class="c-white">- Linux</span>
    <span class="c-white">- Bash</span>
    <span class="c-white">- Python</span>
  <span class="c-cyan">cloud</span><span class="c-white">:</span>
    <span class="c-white">- Amazon AWS</span>
  <span class="c-cyan">infrastructure_as_code</span><span class="c-white">:</span>
    <span class="c-white">- Terraform</span>
    <span class="c-white">- Terragrunt</span>
    <span class="c-white">- Pulumi</span>
    <span class="c-white">- Ansible</span>
  <span class="c-cyan">containerization_and_orchestration</span><span class="c-white">:</span>
    <span class="c-white">- Docker</span>
    <span class="c-white">- Docker Compose</span>
    <span class="c-white">- Kubernetes</span>
    <span class="c-white">- Helm</span>
  <span class="c-cyan">ci_cd_and_version_control</span><span class="c-white">:</span>
    <span class="c-white">- Git</span>
    <span class="c-white">- GitHub &amp; GitHub Actions</span>
    <span class="c-white">- GitLab CI/CD</span>
  <span class="c-cyan">monitoring_and_observability</span><span class="c-white">:</span>
    <span class="c-white">- Grafana</span>
    <span class="c-white">- Victoria Metrics</span>
    <span class="c-white">- Prometheus</span>
    <span class="c-white">- Alertmanager</span>
  <span class="c-cyan">databases</span><span class="c-white">:</span>
    <span class="c-white">- PostgreSQL</span>

<span class="c-green c-bold">certifications</span><span class="c-white">:</span>
  <span class="c-white">- name:</span> <span class="c-yellow">AWS Certified Cloud Practitioner</span>
    <span class="c-white">issuer:</span> Amazon Web Services`;
    }

    function cmdTerraform() {
        return `<span class="c-white c-bold">Refreshing Terraform state in-memory...</span>

<span class="c-green c-bold">Terraform will perform the following actions:</span>

  <span class="c-cyan c-bold"># module.raiffeisen_bank.legacy_modules</span>
    <span class="c-green">→</span> Modified and updated legacy Terraform modules to adapt
      infrastructure for new operational tasks and security standards

  <span class="c-cyan c-bold"># module.rpc_radiy.aws_resources</span>
    <span class="c-green">→</span> Provisioned and managed AWS resources (roles, databases,
      permissions) using Terraform
    <span class="c-green">→</span> Handled both initial setups and ongoing maintenance

  <span class="c-purple c-bold">Also experienced with:</span>
    <span class="c-white">├──</span> <span class="c-teal">Terragrunt</span>  — Terraform wrapper for DRY configurations
    <span class="c-white">├──</span> <span class="c-teal">Pulumi</span>      — Managed OpsGenie alerting infrastructure
    <span class="c-white">└──</span> <span class="c-teal">Ansible</span>     — Configuration management & automation

<span class="c-green c-bold">Plan:</span> 3 years of IaC experience. <span class="c-red">0 to destroy.</span>`;
    }

    function cmdKubectl() {
        return `<span class="c-white c-bold">NAMESPACE     NAME                                READY   STATUS    AGE</span>
<span class="c-white">raiffeisen</span>    helm-kafka-connect-7d4f8b9c6         <span class="c-green">1/1</span>     <span class="c-green">Running</span>   10mo
<span class="c-white">raiffeisen</span>    k8s-managed-services-6f7d8c9b4       <span class="c-green">1/1</span>     <span class="c-green">Running</span>   10mo
<span class="c-white">raiffeisen</span>    legacy-services-bridge-8a2c1d        <span class="c-green">1/1</span>     <span class="c-green">Running</span>   10mo

<span class="c-cyan c-bold">Key Achievements:</span>
  <span class="c-green">●</span> Developed a new, general <span class="c-yellow">Helm chart for Kafka-connect</span>,
    streamlining the deployment process
  <span class="c-green">●</span> Maintained both <span class="c-white c-bold">Kubernetes-based services</span> and legacy
    services outside Kubernetes
  <span class="c-green">●</span> Experienced with <span class="c-teal">Helm</span> for templating and managing
    Kubernetes deployments`;
    }

    function cmdDocker() {
        return `<span class="c-white c-bold">CONTAINER ID   IMAGE                    STATUS          NAMES</span>
<span class="c-dim">a3f2d1e8b7</span>     app/backend:latest       <span class="c-green">Up 2 years</span>      rpc-radiy-app
<span class="c-dim">b7c4e8f9d1</span>     app/frontend:optimized   <span class="c-green">Up 2 years</span>      rpc-radiy-web
<span class="c-dim">9d1a5c3e2f</span>     docker-compose/stack     <span class="c-green">Up 2 years</span>      compose-services

<span class="c-cyan c-bold">Key Achievements @ RPC "Radiy":</span>
  <span class="c-green">●</span> Built and optimized <span class="c-yellow">Docker / Docker Compose</span> images
    to support application deployment
  <span class="c-green">●</span> Implemented containerization best practices for
    consistent development and production environments`;
    }

    function cmdAws() {
        return `<span class="c-white">{</span>
    <span class="c-cyan">"UserId"</span>:        <span class="c-yellow">"AIDADEVOPS2024VASIL"</span>,
    <span class="c-cyan">"Account"</span>:       <span class="c-yellow">"vasil-poliakov"</span>,
    <span class="c-cyan">"Arn"</span>:           <span class="c-yellow">"arn:aws:iam::user/vasil-poliakov"</span>,

    <span class="c-cyan">"Certification"</span>: <span class="c-green c-bold">"AWS Certified Cloud Practitioner ✓"</span>,

    <span class="c-cyan">"Experience"</span>: [
        <span class="c-yellow">"Led migration of databases from AWS RDS to EC2 instances"</span>,
        <span class="c-yellow">"Configured AWS SSO for ArgoCD utilizing Dex"</span>,
        <span class="c-yellow">"Provisioned and managed AWS resources using Terraform"</span>,
        <span class="c-yellow">"Mitigated infrastructure vulnerabilities (ORCA policies)"</span>,
        <span class="c-yellow">"Collaborated on various tasks using AWS services"</span>
    ]
<span class="c-white">}</span>`;
    }

    function cmdGitLog() {
        return `<span class="c-yellow">commit a3f2d1e</span> <span class="c-white c-bold">(</span><span class="c-green c-bold">HEAD -> </span><span class="c-green">career</span><span class="c-white c-bold">)</span>
<span class="c-white">Author:</span> Vasil Poliakov &lt;vasilpol203@gmail.com&gt;
<span class="c-white">Date:</span>   <span class="c-cyan">Nov 2024 – Present</span>

    <span class="c-white c-bold">DevOps Engineer | Raiffeisen Bank Ukraine</span>
    <span class="c-dim">Full-time, Remote</span>
    Helm charts · Terraform · K8s · AWS RDS migration
    CIS hardening · Grafana · OpsGenie · Alertmanager

<span class="c-yellow">commit b7c4e8f</span>
<span class="c-white">Author:</span> Vasil Poliakov &lt;vasilpol203@gmail.com&gt;
<span class="c-white">Date:</span>   <span class="c-cyan">2024</span>

    <span class="c-white c-bold">DevOps Engineer | Freelance</span>
    <span class="c-dim">Part-time, Remote</span>
    AWS SSO · ArgoCD · Dex · Monitoring as Code · Alerting

<span class="c-yellow">commit 9d1a5c3</span>
<span class="c-white">Author:</span> Vasil Poliakov &lt;vasilpol203@gmail.com&gt;
<span class="c-white">Date:</span>   <span class="c-cyan">Dec 2022 – Dec 2024</span>

    <span class="c-white c-bold">DevOps Engineer | RPC "Radiy"</span>
    <span class="c-dim">Full-time</span>
    CI/CD · Docker · Terraform · AWS · Victoria Metrics · Grafana`;
    }

    function cmdGrafana() {
        return `<span class="c-green c-bold">Monitoring & Observability Stack</span>

  <span class="c-white c-bold">Tools:</span>
    <span class="c-white">├──</span> <span class="c-teal">Grafana</span>          <span class="c-green">██████████████████</span><span class="c-dim">░░</span>  Dashboards & Visualization
    <span class="c-white">├──</span> <span class="c-teal">Prometheus</span>       <span class="c-green">████████████████</span><span class="c-dim">░░░░</span>  Metrics & Alerting
    <span class="c-white">├──</span> <span class="c-teal">Victoria Metrics</span> <span class="c-green">████████████████</span><span class="c-dim">░░░░</span>  Time Series DB
    <span class="c-white">├──</span> <span class="c-teal">Alertmanager</span>     <span class="c-green">██████████████</span><span class="c-dim">░░░░░░</span>  Alert Routing
    <span class="c-white">└──</span> <span class="c-teal">OpsGenie</span>         <span class="c-green">████████████</span><span class="c-dim">░░░░░░░░</span>  Incident Management

  <span class="c-cyan c-bold">Experience:</span>
    <span class="c-green">●</span> Configured custom monitoring metrics and <span class="c-yellow">Grafana dashboards</span>
    <span class="c-green">●</span> Implemented alert routing to <span class="c-white c-bold">MS Teams</span> via Prometheus Alertmanager
    <span class="c-green">●</span> Managed <span class="c-yellow">OpsGenie</span> alerting infrastructure using Pulumi
    <span class="c-green">●</span> Set up monitoring with <span class="c-teal">Victoria Metrics</span> and Grafana
    <span class="c-green">●</span> Assisted in <span class="c-white">Monitoring as Code</span> practices
    <span class="c-green">●</span> Tuned alerting to reduce noise and improve incident response`;
    }

    function cmdPipeline() {
        return `<span class="c-green c-bold">Pipeline Status — CI/CD Experience</span>

  <span class="c-white c-bold">Stage</span>                   <span class="c-white c-bold">Status</span>          <span class="c-white c-bold">Tools</span>
  ─────────────────────────────────────────────────────
  <span class="c-white">Build</span>                   <span class="c-green">✓ passed</span>        Docker, Docker Compose
  <span class="c-white">Test</span>                    <span class="c-green">✓ passed</span>        Bash scripts, Python
  <span class="c-white">Security Scan</span>           <span class="c-green">✓ passed</span>        ORCA, CIS benchmarks
  <span class="c-white">Deploy to Staging</span>       <span class="c-green">✓ passed</span>        Helm, Kubernetes
  <span class="c-white">Deploy to Production</span>    <span class="c-green">✓ passed</span>        Terraform, AWS

  <span class="c-cyan c-bold">Experience:</span>
    <span class="c-green">●</span> Developed and contributed to <span class="c-yellow">CI/CD pipelines</span>, improving
      the efficiency of feature delivery
    <span class="c-green">●</span> Worked with <span class="c-white c-bold">GitHub Actions</span> and <span class="c-white c-bold">GitLab CI/CD</span>
    <span class="c-green">●</span> Automated builds, testing, and deployments end-to-end`;
    }

    function cmdEducation() {
        return `<span class="c-green c-bold">Education</span>

  <span class="c-white c-bold">Central Ukrainian State University</span>
  <span class="c-cyan">2020 – 2024</span>`;
    }

    function cmdNeofetch() {
        return `<span class="c-green">        .--.        </span>  <span class="c-white c-bold">vasil</span>@<span class="c-white c-bold">devops</span>
<span class="c-green">       |o_o |       </span>  ──────────────
<span class="c-green">       |:_/ |       </span>  <span class="c-cyan">OS:</span>       Linux (RHEL, Ubuntu)
<span class="c-green">      //   \\ \\      </span>  <span class="c-cyan">Role:</span>     DevOps Engineer
<span class="c-green">     (|     | )     </span>  <span class="c-cyan">Company:</span>  Raiffeisen Bank Ukraine
<span class="c-green">    /'\\_   _/\`\\    </span>  <span class="c-cyan">Uptime:</span>   3+ years
<span class="c-green">    \\___)=(___/    </span>  <span class="c-cyan">Shell:</span>    bash / zsh
                      <span class="c-cyan">Terminal:</span> portfolio v1.0
                      <span class="c-cyan">Packages:</span> Terraform, K8s, Docker, Helm
                      <span class="c-cyan">Cloud:</span>    AWS ☁️
                      <span class="c-cyan">Cert:</span>     AWS CCP <span class="c-green">✓</span>
                      <span class="c-cyan">Editor:</span>   vim <span class="c-dim">(btw)</span>`;
    }

    function cmdClear() {
        output.innerHTML = '';
        return null;
    }

    function cmdLs() {
        return `<span class="c-cyan c-bold">profile.md</span>    <span class="c-cyan c-bold">skills.yaml</span>    <span class="c-cyan c-bold">education.txt</span>
<span class="c-green c-bold">terraform/</span>    <span class="c-green c-bold">kubernetes/</span>    <span class="c-green c-bold">docker/</span>
<span class="c-green c-bold">aws/</span>          <span class="c-green c-bold">monitoring/</span>    <span class="c-green c-bold">ci-cd/</span>

<span class="c-dim">Hint:</span> <span class="c-green">cat &lt;file&gt;</span> <span class="c-dim">to read files,</span> <span class="c-green">cd &lt;folder&gt;</span> <span class="c-dim">to explore directories.</span>`;
    }

    function cmdCd() {
        return `<span class="c-dim">Usage:</span> <span class="c-green">cd &lt;directory&gt;</span>

  <span class="c-green c-bold">terraform/</span>     Infrastructure as Code experience
  <span class="c-green c-bold">kubernetes/</span>    Kubernetes & orchestration work
  <span class="c-green c-bold">docker/</span>        Containerization experience
  <span class="c-green c-bold">aws/</span>           AWS cloud & certifications
  <span class="c-green c-bold">monitoring/</span>    Monitoring & observability stack
  <span class="c-green c-bold">ci-cd/</span>         CI/CD pipelines experience`;
    }

    function cmdExit() {
        return `<span class="c-yellow">Thanks for visiting! But you can't exit the web 🌐</span>
<span class="c-dim">Feel free to reach out: vasilpol203@gmail.com</span>`;
    }

    function cmdSudo() {
        return `<span class="c-red">[sudo] password for vasil:</span> <span class="c-dim">Nice try! No root access here 😄</span>`;
    }

    function cmdRm() {
        return `<span class="c-red">rm: cannot remove '/': This portfolio is read-only 🛡️</span>`;
    }

    // ═══════════════════════════════════════════
    //  Welcome Message
    // ═══════════════════════════════════════════

    function showWelcome() {
        const welcome = `<span class="c-green c-bold">Welcome to Vasil Poliakov's DevOps Terminal</span> <span class="c-dim">v1.0</span>

<span class="c-dim">Type</span> <span class="c-green">help</span> <span class="c-dim">for available commands. Each DevOps tool shows real experience.</span>
<span class="c-dim">Try:</span> <span class="c-cyan">terraform</span> · <span class="c-cyan">kubectl</span> · <span class="c-cyan">docker</span> · <span class="c-cyan">aws</span> · <span class="c-cyan">monitoring</span> · <span class="c-cyan">cicd</span> · <span class="c-cyan">git log</span>
`;
        const block = document.createElement('div');
        block.className = 'output-block';
        block.innerHTML = `<div class="output-result">${welcome}</div>`;
        output.appendChild(block);
    }

    // ═══════════════════════════════════════════
    //  Command Execution
    // ═══════════════════════════════════════════

    function executeCommand(raw) {
        const trimmed = raw.trim();
        const lower = trimmed.toLowerCase();

        if (trimmed) {
            history.push(trimmed);
            historyIndex = history.length;
        }

        const block = document.createElement('div');
        block.className = 'output-block';

        const escapedCmd = trimmed
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        block.innerHTML = `${PROMPT_HTML}<span class="output-command">${escapedCmd}</span>`;

        if (trimmed === '') {
            output.appendChild(block);
            scrollToBottom();
            return;
        }

        const handler = commands[lower]
            || commands[lower.replace(/\/\s*$/, '')]
            || commands[lower.split(' ').slice(0, 2).join(' ')]
            || commands[lower.split(' ')[0]];

        if (handler) {
            const result = handler();
            if (result !== null) {
                block.innerHTML += `\n<div class="output-result">${result}</div>`;
            }
        } else {
            block.innerHTML +=
                `\n<div class="output-result"><span class="c-red">command not found:</span> ${escapedCmd}\n<span class="c-dim">Type</span> <span class="c-green">help</span> <span class="c-dim">to see available commands.</span></div>`;
        }

        output.appendChild(block);
        scrollToBottom();
    }

    // ═══════════════════════════════════════════
    //  Tab Completion
    // ═══════════════════════════════════════════

    function tabComplete(partial) {
        if (!partial) return null;
        const lower = partial.toLowerCase();
        const matches = commandNames.filter(c => c.startsWith(lower));
        if (matches.length === 1) return matches[0];
        if (matches.length > 1) {
            let common = matches[0];
            for (let i = 1; i < matches.length; i++) {
                while (!matches[i].startsWith(common)) {
                    common = common.slice(0, -1);
                }
            }
            return common.length > partial.length ? common : null;
        }
        return null;
    }

    // ═══════════════════════════════════════════
    //  Utilities
    // ═══════════════════════════════════════════

    function scrollToBottom() {
        requestAnimationFrame(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }

    // ═══════════════════════════════════════════
    //  Event Listeners
    // ═══════════════════════════════════════════

    input.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Enter':
                executeCommand(input.value);
                input.value = '';
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = history[historyIndex];
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    input.value = history[historyIndex];
                } else {
                    historyIndex = history.length;
                    input.value = '';
                }
                break;

            case 'Tab':
                e.preventDefault();
                const completed = tabComplete(input.value);
                if (completed) input.value = completed;
                break;

            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    cmdClear();
                }
                break;
        }
    });

    terminalBody.addEventListener('click', () => {
        input.focus();
    });

    document.addEventListener('keydown', (e) => {
        if (e.target !== input && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (e.key.length === 1 || e.key === 'Backspace') {
                input.focus();
            }
        }
    });

    // ═══════════════════════════════════════════
    //  Initialization
    // ═══════════════════════════════════════════

    showWelcome();
    input.focus();
})();
