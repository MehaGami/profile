# Vasil Poliakov — DevOps Portfolio

Interactive DevOps terminal portfolio — a personal resume website styled as a Linux terminal.

## 🖥️ Live

**[mehagami.github.io/profile](https://mehagami.github.io/profile/)**

## Features

- **Info card** at the top with key details visible at a glance
- **Interactive terminal** below — type real DevOps commands to explore experience
- Responsive design, dark theme, tab completion, command history (↑↓)
- Zero dependencies — pure HTML, CSS, JavaScript

## Available Commands

| Command | Description |
|---------|-------------|
| `terraform` | Infrastructure as Code experience (Terraform, Terragrunt, Pulumi, Ansible) |
| `kubectl` | Kubernetes & Helm orchestration work |
| `docker` | Containerization experience |
| `aws` | AWS cloud experience & certifications |
| `monitoring` | Monitoring & observability stack (Grafana, Prometheus, VictoriaMetrics) |
| `cicd` | CI/CD pipelines experience |
| `git log` | Career timeline |
| `cat skills.yaml` | All technical skills in YAML format |
| `cat profile.md` | Professional profile |
| `whoami` | Identity & contact info |
| `ls` / `cd <folder>` | Navigate the "filesystem" |
| `neofetch` | Easter egg 🐧 |

## Tech Stack

- HTML5
- CSS3 (custom properties, glassmorphism, responsive)
- Vanilla JavaScript (no frameworks, no build step)
- Google Fonts (JetBrains Mono, Inter)

## Local Development

```bash
# Serve locally
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## Deployment

Hosted on [GitHub Pages](https://pages.github.com/) — pushes to `main` deploy automatically.
